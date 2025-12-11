# 🚗 Building an Ackermann-Drive Autonomous Vehicle Simulator in ROS & Gazebo  
### From Industry-Grade ADAS Systems to Open-Source Robotics

**By Chris Sunny Thaliyath**

Autonomous driving is no longer limited to large automotive OEMs. With open-source tools like ROS and Gazebo, anyone can experiment with vehicle control, SLAM, and navigation in simulation before touching real hardware.

In this article, I walk through the design of my **Ackermann-drive ROS robot simulation** and show how the project draws from my real-world experience building a fully autonomous golfcart at **Bosch Global Software Technologies (2018–2021)**.

Repository link:  
👉 https://github.com/chrissunny94/ackerman_ros_robot_gazebo_simulation

---

![Architecture](/images/LSAD/architecture.png)


# 🏁 Why I Built This Simulation

Vehicles like cars, shuttles, and golfcarts use **Ackermann steering geometry**—the front wheels rotate at different angles so the vehicle can follow curved paths naturally.  

But most robotics tutorials use differential-drive robots, which behave very differently from real cars.  

To bridge that gap, I created a **simulation environment that behaves like a real autonomous vehicle**, complete with:

- Steering linkage geometry  
- Physics-accurate wheel dynamics  
- LiDAR + IMU sensors  
- ROS navigation interfaces  
- Ackermann command support  

This lets you develop algorithms that transfer more easily to real automotive platforms.

---

# 🧩 Project Overview

The repository includes:

### ✔ Ackermann URDF/SDF Model  
Realistic steering joints, wheelbase parameters, and linkages.

### ✔ ROS Control Integration  
Position + velocity controllers for steering and drive motors.

### ✔ Sensor Simulation  
LiDAR, IMU, camera, and optional GPS.

### ✔ Teleoperation Tools  
Drive using keyboard or Ackermann commands.

### ✔ Launch Files for Gazebo + RViz  
One command to bring everything up.

This makes it a powerful environment for:

- SLAM  
- Localization  
- Obstacle avoidance  
- Path planning  
- Control tuning  
- ADAS prototyping  

---

# ⚙️ System Architecture

```

ackerman_ros_robot_gazebo_simulation/
│
├── urdf/            # Complete Ackermann model
├── gazebo/          # Plugins and physics configs
├── config/          # Controller YAML files
├── launch/          # RViz + Gazebo launch scripts
└── scripts/         # Teleop + utilities

````

The structure mirrors real-world robotic systems, making it easy to extend.

---

# 🚀 Getting Started

### Clone & Build
```bash
git clone https://github.com/chrissunny94/ackerman_ros_robot_gazebo_simulation
catkin_make
source devel/setup.bash
````

### Launch Gazebo Simulation

```bash
roslaunch ackerman_robot_gazebo ackerman_sim.launch
```

### Launch RViz Visualization

```bash
roslaunch ackerman_robot_description rviz.launch
```

### Drive With Keyboard

```bash
rosrun teleop_twist_keyboard teleop_twist_keyboard.py
```

### Publish Ackermann Commands

```bash
rostopic pub /ackermann_cmd ackermann_msgs/AckermannDriveStamped
```

---

# 🔬 Real-World Influence: Autonomous Golfcart @ Bosch (2018–2021)

This simulation was heavily inspired by a project I worked on: a **fully autonomous low-speed golfcart** for internal R&D.

Below is a summary of the core modules I built at Bosch.

---

## 🛰️ Perception & Localization

At Bosch, I developed the perception stack using:

* **Velodyne VLP16 LiDAR**
* **GPS + IMU fusion via Extended Kalman Filter**
* **NDT & ICP-based relocalization algorithms**
* **OpenStreetMap lane overlays** for contextual navigation

These concepts can be directly tested in Gazebo by attaching simulated LiDAR + IMU to the robot.

---

## 🧭 Planning & Control

I helped build:

* A **waypoint follower** (contributed upstream to the open-source *follow_waypoints* repo)
* **Lane-Keep Assist (LKA)**
* **Cruise Control** + speed profiling
* Hybrid control loops for Ackermann vehicles

In the simulation, you can replicate these behaviors using:

* Pure Pursuit
* MPC planners
* TEB local planner
* DWB controllers

---

## 🔌 Hardware Integration

On the real golfcart, I built ROS interfaces for:

* CAN bus & DBC decoding
* EPS unit (steering)
* Throttle & brake actuators
* Radar + ultrasonic sensors
* NVIDIA Drive PX GPU acceleration

Even though Gazebo is virtual, these concepts stay relevant because the same ROS interfaces are used to transition from simulation → real hardware.

---

## ⭐ Project Milestone: Fully Autonomous Demo

Our team successfully deployed:

* Full LiDAR SLAM
* Live localization + tracking
* Waypoint navigation
* LKA + ACC ADAS features
* Real-time embedded control

This simulation project is my way of bringing that experience back into the open-source world so others can learn and build from it.

---

# 🎯 What You Can Do With This Project

Here are practical ideas you can experiment with:

### ▪ Implement Pure Pursuit or Stanley Controller

### ▪ Run SLAM (Hector, GMapping, Cartographer)

### ▪ Test LiDAR-based collision avoidance

### ▪ Build a modular autonomous driving stack

### ▪ Port your algorithms to a real robot afterward

The simulation provides the perfect "safe playground."

---

# 🔚 Final Thoughts

Autonomous driving can feel overwhelming, but simulation reduces friction and accelerates innovation.

By blending **open-source robotics** with **real industry practices**, this project gives students, researchers, and professionals a practical way to learn, experiment, and build.

Feel free to explore the repository, fork it, and extend it.

👉 [https://github.com/chrissunny94/ackerman_ros_robot_gazebo_simulation](https://github.com/chrissunny94/ackerman_ros_robot_gazebo_simulation)

