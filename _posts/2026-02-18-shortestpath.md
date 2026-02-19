a# Mastering Dijkstra in C++

## From Classic Shortest Path to State-Augmented Graphs

When preparing for systems, robotics, or high-performance C++ interviews, few algorithms appear as frequently as **Dijkstra’s shortest path algorithm**.

But knowing the textbook version isn’t enough.

In real-world engineering problems, constraints evolve:

* Nodes may become unavailable.
* Costs may change dynamically.
* Extra “abilities” (like boosts, energy, battery limits) may alter the state space.

This article walks through:

1. Classic Dijkstra with blocked nodes
2. State-augmented Dijkstra (one-time boost)
3. The mindset behind solving both cleanly

---

# 1️⃣ Classic Problem: Fastest Route with Blocked Nodes

## Problem

You are given:

* A directed graph with `n` nodes
* Positive edge weights
* A start and goal node
* A set of blocked nodes

Return:

* The shortest time from `start` to `goal`
* `-1` if unreachable
* If start or goal is blocked → return `-1`

---

## Why Dijkstra?

Because:

* All edge weights are positive
* We need the shortest path
* Graph size may be large

Time complexity:

```
O((V + E) log V)
```

---

## Key Observations

* Skip blocked nodes during expansion.
* Use a min-heap (`priority_queue` with `greater<>`).
* Use `long long` to prevent overflow.
* Ignore outdated heap entries.

---

## Clean C++ Implementation

```cpp
#include <vector>
#include <queue>
#include <unordered_set>
#include <limits>

using namespace std;

int fastestRoute(
    int n,
    const vector<vector<pair<int,int>>>& adj,
    int start,
    int goal,
    const unordered_set<int>& blocked
) {
    if (blocked.count(start) || blocked.count(goal))
        return -1;

    const long long INF = numeric_limits<long long>::max();
    vector<long long> dist(n, INF);

    dist[start] = 0;

    priority_queue<
        pair<long long, int>,
        vector<pair<long long, int>>,
        greater<pair<long long, int>>
    > pq;

    pq.push({0, start});

    while (!pq.empty()) {
        auto [currDist, node] = pq.top();
        pq.pop();

        if (currDist > dist[node])
            continue;

        if (node == goal)
            return currDist;

        for (const auto& [neighbor, weight] : adj[node]) {

            if (blocked.count(neighbor))
                continue;

            long long newDist = currDist + weight;

            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push({newDist, neighbor});
            }
        }
    }

    return -1;
}
```

---

## Engineering Insight

This is not just an algorithm question.

It tests:

* Clean memory usage
* Defensive coding
* Early termination
* Handling edge cases

In real systems (robotics, networking, embedded routing), blocked nodes may represent:

* Failed hardware
* Obstacle detection
* Disabled services
* Temporary shutdown zones

The algorithm remains the same — the modeling changes.

---

# 2️⃣ Advanced Version: Fastest Route with One Boost

Now we make it interesting.

## New Rule

You may use **one turbo boost**.

That boost allows you to reduce **exactly one edge cost to zero**.

---

## Why Normal Dijkstra Fails

In the classic version, the state is:

```
(node)
```

But now your path depends on whether you've used the boost.

So the real state becomes:

```
(node, boost_used)
```

Where:

* `boost_used = 0` → boost available
* `boost_used = 1` → boost already used

We have doubled the state space.

This is called **state augmentation**.

---

## Core Idea

Maintain:

```
dist[node][boost_state]
```

For each edge:

* Always try normal transition.
* If boost unused → also try boosted transition.

---

## C++ Implementation

```cpp
#include <vector>
#include <queue>
#include <tuple>
#include <limits>

using namespace std;

int fastestRouteWithBoost(
    int n,
    const vector<vector<pair<int,int>>>& adj,
    int start,
    int goal
) {
    const long long INF = numeric_limits<long long>::max();

    vector<vector<long long>> dist(n, vector<long long>(2, INF));

    using State = tuple<long long, int, int>;
    priority_queue<State, vector<State>, greater<State>> pq;

    dist[start][0] = 0;
    pq.push({0, start, 0});

    while (!pq.empty()) {
        auto [currDist, node, used] = pq.top();
        pq.pop();

        if (currDist > dist[node][used])
            continue;

        for (const auto& [neighbor, weight] : adj[node]) {

            // Normal transition
            long long newDist = currDist + weight;
            if (newDist < dist[neighbor][used]) {
                dist[neighbor][used] = newDist;
                pq.push({newDist, neighbor, used});
            }

            // Boost transition
            if (used == 0) {
                long long boostedDist = currDist;
                if (boostedDist < dist[neighbor][1]) {
                    dist[neighbor][1] = boostedDist;
                    pq.push({boostedDist, neighbor, 1});
                }
            }
        }
    }

    long long result = min(dist[goal][0], dist[goal][1]);
    return (result == INF) ? -1 : static_cast<int>(result);
}
```

---

## Complexity

States:

```
2 * V
```

Transitions:

```
Up to 2 * E
```

Time Complexity:

```
O((V + E) log V)
```

Still efficient.

---

# 3️⃣ The Bigger Lesson

Many advanced graph problems are solved by:

> Expanding the state space.

Instead of asking:

“What is the shortest path to this node?”

Ask:

“What is the shortest path to this *state*?”

Examples in real systems:

* Remaining battery level
* Number of allowed violations
* Used or unused special action
* Gear state in racing
* Communication channel availability

---

# 4️⃣ If We Had K Boosts?

State becomes:

```
(node, boosts_used)
```

Where:

```
boosts_used ∈ [0, K]
```

Total states:

```
V * (K + 1)
```

Time complexity:

```
O((K * V + K * E) log (K * V))
```

If K is small → perfectly fine.
If K is large → rethink the model.

That’s where engineering judgment matters.

---

