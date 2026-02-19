# Mastering Dijkstra in C++

## From Classic Shortest Path to State-Augmented Graphs

When preparing for systems, robotics, or high-performance C++ interviews, few algorithms appear as frequently as **Dijkstra’s shortest path algorithm**.



Perfect! We can add a **graphical visualization** of the Dijkstra problems in your Markdown blog. I’ll provide a version with embedded images (you can generate or draw these in any editor). Here’s a **Markdown-ready blog post with visualizations**:

---

# Mastering Dijkstra in C++

## From Classic Shortest Path to State-Augmented Graphs

Dijkstra’s algorithm is a staple for systems, robotics, and high-performance C++ interviews. But in real-world problems, constraints like blocked nodes or one-time boosts make it more interesting.

This post walks through:

1. Classic Dijkstra with blocked nodes
2. State-augmented Dijkstra (one-time boost)
3. Visualization of how the algorithm explores the graph

---

# 1️⃣ Classic Problem: Fastest Route with Blocked Nodes

### Problem

* Directed graph with `n` nodes
* Positive edge weights
* Start and goal nodes
* Some blocked nodes

Goal: shortest path avoiding blocked nodes.

---

### Visualization

Consider this graph:

```
     (0)
    /   \
  4/     \2
  /       \
 (1)------(2)
   \3      \
    \       \1
     (3)----(4)
```

* Start: `0`
* Goal: `4`
* Blocked node: `2`

**Algorithm Exploration:**

1. Start at `0`. Distance to neighbors: `1->4`, `2->2`.
2. Skip node `2` (blocked).
3. Explore node `1`. Distance to neighbor `3->4+3=7`.
4. Explore node `3`. Distance to neighbor `4->7+1=8`.
5. Goal reached → shortest distance = **8**

---

---

# 2️⃣ Advanced Version: Fastest Route with One Boost

### New Rule

* Use one **boost**: reduces **one edge cost to 0**

### Visualization

Graph:

```
     (0)
    /   \
  4/     \2
  /       \
 (1)------(2)
   \3      \
    \       \1
     (3)----(4)
```

* Start: `0`
* Goal: `4`
* Boost: can use once

**Algorithm Exploration (State-Augmented):**

* State = `(node, boost_used)`
* Start `(0, 0)` → choose `(0->2, boost=1)` → distance `0`
* Continue normal expansion from `(2, 1)` → shortest path = **3**



---

# 3️⃣ How the Algorithm Explores (Visualization Example)

| Step | Node | Distance | Boost Used | Notes                   |
| ---- | ---- | -------- | ---------- | ----------------------- |
| 1    | 0    | 0        | 0          | Start                   |
| 2    | 2    | 0        | 1          | Used boost on edge 0->2 |
| 3    | 4    | 1        | 1          | Reached goal            |

Graphically, the boost allows jumping across heavy edges:

![Dijkstra Boost Visualization](https://user-images.githubusercontent.com/123456789/graph_boost_example.png)
*Green edge: used boost → cost 0*
*Red node: blocked node*

---



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





## 1️⃣ C++ Essentials for Senior Robotics Engineer

### Memory & Pointers

* `unique_ptr<T>` → single ownership, auto-deletes
* `shared_ptr<T>` → multiple ownership, reference counted
* `weak_ptr<T>` → non-owning reference
* RAII → manage resources in constructor/destructor
* Move vs Copy semantics → use `std::move` to avoid unnecessary copies

### STL Quick Reference

| Container               | Access              | Insert/Delete         | Notes               |
| ----------------------- | ------------------- | --------------------- | ------------------- |
| `vector`                | O(1)                | end O(1), middle O(n) | dynamic array       |
| `deque`                 | O(1)                | both ends O(1)        | double-ended queue  |
| `list`                  | O(n)                | O(1)                  | doubly-linked list  |
| `map`                   | O(log n)            | O(log n)              | sorted key-value    |
| `unordered_map`         | O(1) avg            | O(1) avg              | hash map            |
| `set` / `unordered_set` | O(log n) / O(1) avg | O(log n)/O(1) avg     | unique keys         |
| `priority_queue`        | O(1) peek           | O(log n) push/pop     | max heap by default |

### Algorithm Tips

* Always check bounds / edge cases (`empty`, `start == goal`, `blocked node`)
* Prefer `emplace` over `push_back` when possible
* Use `std::pair` and `std::tuple` for graph nodes `(distance, node)`

---

## 2️⃣ Graph Algorithms & Variants

### Classic Dijkstra (Blocked Nodes)

* Skip blocked nodes in the graph
* Use `priority_queue` (min-heap) to pick smallest distance
* Complexity: `O((V+E) log V)`

```cpp
int fastestRoute(int n, const vector<vector<pair<int,int>>>& adj,
                 int start, int goal, const unordered_set<int>& blocked);
```

**Example Visualization:**

```
     (0)
    /   \
  4/     \2
  /       \
 (1)------(2)
   \3      \
    \       \1
     (3)----(4)

Blocked: 2 → Path 0→1→3→4
```

### Dijkstra with One-Time Boost

* State = `(node, boost_used)`
* Boost reduces one edge cost to 0
* Complexity: `O(V * 2 + E log V)`

```cpp
int fastestRouteWithBoost(int n, const vector<vector<pair<int,int>>>& adj,
                          int start, int goal);
```

**Visualization:** Boost on heaviest edge, track distances separately for `boost_used=0` and `boost_used=1`

---

## 3️⃣ RTOS & Embedded System Concepts

### Bare Metal vs FreeRTOS

| Aspect    | Bare Metal     | FreeRTOS   |
| --------- | -------------- | ---------- |
| Timing    | Implicit       | Explicit   |
| Blocking  | Global failure | Local      |
| Scaling   | Painful        | Structured |
| Debugging | Guesswork      | Traceable  |
| Safety    | Weak           | Stronger   |

### Task Examples

```cpp
void sensor_task(void *arg) {
    TickType_t last = xTaskGetTickCount();
    while(1){
        read_sensor();
        xQueueSend(sensor_queue, &data, 0);
        vTaskDelayUntil(&last, pdMS_TO_TICKS(10));
    }
}

void processing_task(void *arg){
    while(1){
        xQueueReceive(sensor_queue, &data, portMAX_DELAY);
        process_data();
        xQueueSend(tx_queue, &result, 0);
    }
}
```

**Tips:**

* Avoid blocking in sensor/control loops
* Use `xQueueSend` / `xQueueReceive` for inter-task communication
* Heartbeat task → periodic LED / status without blocking

---

## 4️⃣ System Design / Senior Thinking

* **Pipeline:** Sensor → Processing → Control → Communication
* Multi-threading with queues → avoid global locks
* Fail-safe: blocked sensor should not stall control loop
* Modular: plug-and-play tasks, testable individually
* Debug: logging, traceable execution, real-time metrics

**Scenario Qs:**

* Handle intermittent CAN delays in multi-sensor fusion
* Optimize path planning under limited CPU & latency
* Design task priorities for real-time perception + MPC

---

## 5️⃣ Behavioral / Team Fit

* STAR method: Situation → Task → Action → Result

* Examples:

  * Debugging intermittent failures in autonomous systems
  * Handling tight deadlines in multi-threaded robotics software
  * System-level trade-offs: latency vs compute vs memory

* Motivational / fit:

  * “Why TII / Autonomous Racing?” → Focus on cutting-edge research + Abu Dhabi center
  * Leadership / collaboration → explain architecture choices clearly

---

## 6️⃣ Last-Minute Interview Tips

* Think **aloud**, communicate reasoning clearly
* Clarify problem constraints before coding
* Handle **edge cases**: empty graph, blocked nodes, start = goal
* Focus on **architecture decisions**, not just syntax
* Use diagrams or pseudo-visualizations if asked to explain

---

## 7️⃣ Quick Visuals

### Graph Example

```
Node layout:
0 -1-> 1 -3-> 3
0 -2-> 2 (blocked)
3 -1-> 4
```

### RTOS Timeline

```
Sensor Task:   |read| wait |read| wait|
Processing:        |process|
Comm Task:              |send|
Heartbeat: |--blink--| |--blink--|
```

### Pipeline

```
Sensor → Processing → Control → Communication → Logging/Telemetry
```

---

