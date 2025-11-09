## "Go Here, Then Here, Then Here": Automating Robot Patrols with `follow_waypoints`

In autonomous robotics, telling a robot to "go to point X" is a standard task. But what if you need it to "go to point A, then B, then C, and patrol all day?" This is the challenge of waypoint navigation, and it's a critical one for tasks like warehouse patrols, agricultural surveys, or search and rescue.

A fantastic, focused ROS package for solving this is **[follow_waypoints](https://github.com/chrissunny94/follow_waypoints)**, forked by Chris Sunny from an original project by Daniel Snider. It’s a simple, powerful tool that acts as a mission manager for the ROS navigation stack.

### The Problem: `move_base` Only Takes One Goal at a Time

The core navigation "brain" in ROS is `move_base`. It's brilliant at planning a path from A to B while avoiding obstacles. However, it's designed to handle *one goal at a time*. If you want to give it a sequence of goals, you'd have to write a custom script to wait for the first goal to complete, then send the second, and so on.

### The Solution: A Smart Waypoint Queue

This is exactly what the `follow_waypoints` package does. It's a Python-based ROS node that acts as a smart buffer on top of `move_base`.

It allows a user to "load up" a list of waypoints and then, with a single command, tell the robot to "go!" The node then takes over, feeding each waypoint to `move_base` one by one, only sending the next goal after the previous one has been successfully reached.



### How It Works in Practice

The workflow is simple and designed for easy use with standard ROS tools:

1.  **Create Waypoints:** The easiest way to create a path is right in **RViz** (the ROS visualization tool). By using the "2D Pose Estimate" tool, a user can simply click on the map to define a series of waypoints. The `follow_waypoints` node listens for these clicks and adds them to its queue.
2.  **Visualize the Path:** As waypoints are added, the node publishes the entire list as a `PoseArray`, which can be viewed in RViz as a series of arrows showing the robot's intended path.
3.  **Start the Mission:** When the user is ready, they publish a simple message to the `/path_ready` topic. This is the "go" signal.
4.  **Execute:** The node enters its `FOLLOW_PATH` state, takes the first waypoint from its queue, and sends it as a goal to `move_base` using `actionlib`.
5.  **Repeat:** When `move_base` reports success, the node waits for a specified `wait_duration` (if any), then sends the next waypoint. This continues until the queue is empty.
6.  **Clear:** A message to `/path_reset` can clear the queue at any time.

This package is a perfect example of the ROS philosophy: a small, modular node that does one job extremely well. It's an essential tool for anyone, from students in the University Rover Challenge (a listed use case) to researchers who need to automate complex navigation tasks.

If you're working with ROS navigation, this project is a must-see for turning a simple point-to-point robot into a fully autonomous patrol machine. **[Check it out on GitHub here!](https://github.com/chrissunny94/follow_waypoints)**