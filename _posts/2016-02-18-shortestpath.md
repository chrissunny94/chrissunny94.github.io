# Mastering Dijkstra in C++

## From Classic Shortest Path to State-Augmented Graphs

When preparing for systems, robotics, or high-performance C++ interviews, few algorithms appear as frequently as **Dijkstra’s shortest path algorithm**.




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

    //Initially, all nodes are infinitely far away.
    //Since C++ has no built-in infinity for integers, we use the largest possible value.
    const long long INF = numeric_limits<long long>::max();
    //I have seen some seniors use it like this aswell 
    //It’s large enough
    //Safe for addition
    //No overflow risk
    //const long long INF = 1e18;



    //Each element stores a long long (64-bit integer).
    //We use long long instead of int because:
    //-Path costs can become large
    //-Prevents integer overflow
    //dist = [INF, INF, INF, INF, INF]
    vector<long long> dist(n, INF);


    //In Dijkstra:
    //dist[i] = shortest known distance from start to node i
    //Initially → we don't know any distances
    //So we initialize everything to infinity
    dist[start] = 0;

    //This creates a min-heap priority queue.
    //pair<long long, int>
    //{distance, node}
    //Example:
        //{5, 3}   // distance 5 to node 3
    priority_queue<
        pair<long long, int>,
        vector<pair<long long, int>>,
        greater<pair<long long, int>>
    > pq;

    pq.push({0, start});

    //1️⃣ While PQ not empty
    while (!pq.empty()) {

        //2️⃣ Extract closest node
        //Because it’s a min heap, this is the node with:
        //smallest known distance so far
        auto [currDist, node] = pq.top();
        pq.pop();

        //3️⃣ Skip stale entries
        //Because C++ priority queue cannot decrease key.
        if (currDist > dist[node])
            continue;

        //4️⃣ Early Exit Optimization
        if (node == goal)
            return currDist;

        //5️⃣ Traverse neighbors
        for (const auto& [neighbor, weight] : adj[node]) {
            
            //6️⃣ Skip blocked nodes
            //Blocked is likely:
            // unordered_set<int> blocked;
            // If neighbor is blocked, we ignore it.
            // This modifies classic Dijkstra slightly.
            if (blocked.count(neighbor))
                continue;

            // 7️⃣ Relaxation Step
            long long newDist = currDist + weight;

            // 8️⃣ Relax condition
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

    #Initially, all nodes are infinitely far away.
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



Good.

You don’t need motivation now.

You need **controlled coverage**.

Below is a **compact senior-level C++ pack** covering:

* Dijkstra (blocked nodes)
* Dijkstra (boost state)
* Thread-safe queue (mutex + condition_variable)
* Producer–consumer example
* Small system design pattern (sensor → processing → comm pipeline)

This is the “likely surface area” for your interview.

---

# 1️⃣ Dijkstra — Blocked Nodes

```cpp
#include <bits/stdc++.h>
using namespace std;

int fastestRoute(
    int n,
    const vector<vector<pair<int,int>>>& adj,
    int start,
    int goal,
    const unordered_set<int>& blocked
){
    if (blocked.count(start) || blocked.count(goal))
        return -1;

    const long long INF = LLONG_MAX;
    vector<long long> dist(n, INF);

    using State = pair<long long,int>; // {distance, node}
    priority_queue<State, vector<State>, greater<State>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); 
        pq.pop();

        if (d > dist[u]) continue;

        if (u == goal) return d;

        for (auto [v, w] : adj[u]) {
            if (blocked.count(v)) continue;

            long long newDist = d + w;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push({newDist, v});
            }
        }
    }

    return -1;
}
```

Complexity: `O((V+E) log V)`

---

# 2️⃣ Dijkstra — One-Time Boost (State Expansion)

```cpp
int fastestRouteWithBoost(
    int n,
    const vector<vector<pair<int,int>>>& adj,
    int start,
    int goal
){
    const long long INF = LLONG_MAX;

    vector<vector<long long>> dist(n, vector<long long>(2, INF));

    using State = tuple<long long,int,int>; 
    // {distance, node, boost_used}

    priority_queue<State, vector<State>, greater<State>> pq;

    dist[start][0] = 0;
    pq.push({0, start, 0});

    while (!pq.empty()) {
        auto [d, u, used] = pq.top();
        pq.pop();

        if (d > dist[u][used]) continue;

        for (auto [v, w] : adj[u]) {

            // Normal transition
            long long nd = d + w;
            if (nd < dist[v][used]) {
                dist[v][used] = nd;
                pq.push({nd, v, used});
            }

            // Boost transition
            if (used == 0) {
                if (d < dist[v][1]) {
                    dist[v][1] = d;
                    pq.push({d, v, 1});
                }
            }
        }
    }

    long long ans = min(dist[goal][0], dist[goal][1]);
    return ans == INF ? -1 : (int)ans;
}
```

If asked: “What if K boosts?”

→ Expand state to `(node, boosts_used)`.

---

# 3️⃣ Thread-Safe Queue (Production Grade Pattern)

This is common in robotics pipelines.

```cpp
template<typename T>
class ThreadSafeQueue {
private:
    queue<T> q;
    mutable mutex m;
    condition_variable cv;

public:
    void push(T value) {
        {
            lock_guard<mutex> lock(m);
            q.push(move(value));
        }
        cv.notify_one();
    }

    bool try_pop(T& result) {
        lock_guard<mutex> lock(m);
        if (q.empty()) return false;
        result = move(q.front());
        q.pop();
        return true;
    }

    void wait_and_pop(T& result) {
        unique_lock<mutex> lock(m);
        cv.wait(lock, [this]{ return !q.empty(); });

        result = move(q.front());
        q.pop();
    }

    bool empty() const {
        lock_guard<mutex> lock(m);
        return q.empty();
    }
};
```

Senior explanation if asked:

* Mutex protects shared state
* Condition variable avoids busy-wait
* RAII locks prevent deadlocks
* Move semantics reduce copy cost

---

# 4️⃣ Producer–Consumer Example

```cpp
ThreadSafeQueue<int> queueData;

void producer() {
    for (int i = 0; i < 10; ++i) {
        queueData.push(i);
        this_thread::sleep_for(chrono::milliseconds(100));
    }
}

void consumer() {
    while (true) {
        int value;
        queueData.wait_and_pop(value);
        cout << "Consumed: " << value << endl;
    }
}
```

If asked:

“Why not use atomic?”

→ Because queue operations are compound operations.

---

# 5️⃣ Simple Robotics Pipeline (Multithreaded)

Sensor → Processing → Communication

```cpp
ThreadSafeQueue<int> sensorQueue;
ThreadSafeQueue<int> txQueue;

void sensorThread() {
    while (true) {
        int data = rand() % 100;
        sensorQueue.push(data);
        this_thread::sleep_for(chrono::milliseconds(10));
    }
}

void processingThread() {
    while (true) {
        int data;
        sensorQueue.wait_and_pop(data);

        int result = data * 2;  // fake processing
        txQueue.push(result);
    }
}

void commThread() {
    while (true) {
        int result;
        txQueue.wait_and_pop(result);
        cout << "Sending: " << result << endl;
    }
}
```

If asked:

“How would you prioritize?”

→ Use separate threads + OS scheduling
→ Or RTOS priorities
→ Or bounded queues for backpressure

---

# 6️⃣ Quick STL Trap Reminders

Min-heap:

```cpp
priority_queue<int, vector<int>, greater<int>> minHeap;
```

Custom comparator:

```cpp
struct Compare {
    bool operator()(int a, int b) {
        return a > b;
    }
};
```

Erase from unordered_set:

```cpp
blocked.erase(node);
```

---

# 7️⃣ If They Escalate to System Design

Answer like this:

“I would design a decoupled pipeline using thread-safe queues, avoid blocking in sensor loop, and ensure deterministic latency by bounding queue sizes.”

That sentence alone sounds senior.

---



```
int fastestRouteWithOneUnlock(
    int n,
    const vector<vector<pair<int,int>>>& adj,
    int start,
    int goal,
    const unordered_set<int>& blocked
) {
    const long long INF = LLONG_MAX;

    // dist[node][0 or 1]
    vector<vector<long long>> dist(n, vector<long long>(2, INF));

    using State = tuple<long long, int, int>;
    // {distance, node, used_unlock}

    priority_queue<State, vector<State>, greater<State>> pq;

    dist[start][0] = 0;
    pq.push({0, start, 0});

    while (!pq.empty()) {
        auto [currDist, node, used] = pq.top();
        pq.pop();

        if (currDist > dist[node][used])
            continue;

        if (node == goal)
            return currDist;

        for (auto [neighbor, weight] : adj[node]) {

            bool isBlocked = blocked.count(neighbor);

            // Case 1: neighbor not blocked
            if (!isBlocked) {
                long long newDist = currDist + weight;

                if (newDist < dist[neighbor][used]) {
                    dist[neighbor][used] = newDist;
                    pq.push({newDist, neighbor, used});
                }
            }
            // Case 2: neighbor blocked but we haven't used unlock
            else if (used == 0) {
                long long newDist = currDist + weight;

                if (newDist < dist[neighbor][1]) {
                    dist[neighbor][1] = newDist;
                    pq.push({newDist, neighbor, 1});
                }
            }
        }
    }

    return -1;
}

```