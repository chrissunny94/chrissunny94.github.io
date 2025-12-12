## Keeping Robots on Track: A C++ and ROS Lane Detection Project

For any autonomous ground robot, from a self-driving car to a small warehouse bot, the ability to perceive the environment is critical. One of the most fundamental tasks in navigation is identifying and following lanes. This is where a fantastic, focused project from developer Chris Sunny (chrissunny94) comes in: **[Lane_Detection_CPP_ROS](https://github.com/chrissunny94/Lane_Detection_CPP_ROS)**.

This repository isn't just a theoretical script; it's a practical, high-performance solution built for real robots.

### What It Is

The project is a **C++ implementation of lane detection** built to plug directly into the **Robot Operating System (ROS)**.

At its core, it uses the industry-standard **OpenCV (Open Source Computer Vision) library** to perform the complex task of image processing. It's designed to take a video feed from a robot's camera, analyze each frame to identify lane markings on the ground, and then calculate the lane's position and curvature.

---

### 🎥 Lane Detection Demo

<p align="center">
  <iframe width="560" height="315"
    src="https://www.youtube.com/embed/4wGohufr2_c"
    title="Lane Detection Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</p>

---

### The "C++" and "ROS" Advantage

What makes this project stand out is its choice of technologies:

1. **Why C++?**  
   In robotics, speed is not a luxury—it's a necessity. A robot must be able to react to its environment in real-time. C++ is a high-performance language, allowing the computationally heavy OpenCV algorithms to run as fast as possible. This ensures the robot gets a constant, low-latency stream of data about its position in the lane.

2. **Why ROS?**  
   The "ROS interfaces" are the key to making this project practical. It's not just a script that draws on an image; it's a modular ROS *node*. This means it can seamlessly "talk" to other parts of a robot:
   * It **subscribes** to a camera's image topic.
   * It **processes** the images to find the lanes.
   * It **publishes** its findings (like the lane's center or curve) to other ROS topics.
   * A separate *control* node can then listen to this data to steer the robot's motors, creating a complete lane-following system.

The repository, tested on ROS Kinetic, is structured as a standard ROS package with `src`, `launch`, and `include` folders. Anyone familiar with ROS can get it running with a simple `catkin_make`.

---

### Lane Detection Flowchart

<div style="width:100%; max-width:900px; margin:auto;">

<div class="chart-container" style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color:#0f172a; padding:30px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.5); color:#f8fafc;">
  <div class="chart-title" style="text-align:center; margin-bottom:30px; font-size:24px; font-weight:600; color:#60a5fa; letter-spacing:0.5px;">Lane Detection: ROS + OpenCV Flow</div>
  
  <svg viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
    <defs>
      <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M2,2 L10,6 L2,10" fill="#64748b" />
      </marker>
    </defs>

    <!-- Nodes -->
    <g class="node-group" transform="translate(20, 20)">
      <rect class="node-rect" width="220" height="70" rx="8" style="fill:#f9f; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">1. ROS Camera Image</text>
    </g>

    <g class="node-group" transform="translate(250, 20)">
      <rect class="node-rect" width="220" height="70" rx="8" style="fill:#bbf; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">2. Convert ROS Image to OpenCV Mat</text>
    </g>

    <g class="node-group" transform="translate(480, 20)">
      <rect class="node-rect" width="200" height="90" rx="8" style="fill:#bfb; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="30" style="fill:#0f172a; font-weight:700;">3. Preprocessing</text>
      <text x="15" y="50" style="fill:#cbd5e1; font-size:13px;">Grayscale Conversion</text>
      <text x="15" y="70" style="fill:#cbd5e1; font-size:13px;">Gaussian Blur</text>
    </g>

    <g class="node-group" transform="translate(700, 20)">
      <rect class="node-rect" width="180" height="70" rx="8" style="fill:#ffb; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">4. Edge Detection (Canny)</text>
    </g>

    <g class="node-group" transform="translate(700, 120)">
      <rect class="node-rect" width="180" height="70" rx="8" style="fill:#fbf; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">5. ROI Mask</text>
    </g>

    <g class="node-group" transform="translate(480, 220)">
      <rect class="node-rect" width="200" height="70" rx="8" style="fill:#fbb; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">6. Hough Line Transform</text>
    </g>

    <g class="node-group" transform="translate(250, 320)">
      <rect class="node-rect" width="220" height="70" rx="8" style="fill:#bff; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">7. Lane Classification & Averaging</text>
    </g>

    <g class="node-group" transform="translate(20, 420)">
      <rect class="node-rect" width="220" height="70" rx="8" style="fill:#ff9; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">8. Draw Lane Lines</text>
    </g>

    <g class="node-group" transform="translate(250, 420)">
      <rect class="node-rect" width="220" height="70" rx="8" style="fill:#9ff; stroke:#333; stroke-width:2;"></rect>
      <text x="15" y="35" style="fill:#0f172a; font-weight:700;">9. Publish to ROS / Display</text>
    </g>

    <!-- Edges -->
    <path d="M240 55 L250 55" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M470 55 L480 55" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M680 55 L700 55" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M790 90 L790 120" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M790 155 L680 255" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M580 295 L380 335" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M360 355 L130 455" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M240 455 L250 455" class="edge-path" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />

  </svg>
</div>

</div>


## Summary

The OpenCV C++ pipeline:

1. Convert ROS image to OpenCV `cv::Mat`  
2. Grayscale conversion and Gaussian blur  
3. Canny edge detection  
4. Apply ROI mask  
5. Detect line segments with Hough Transform  
6. Classify and average left/right lanes  
7. Draw lane lines on the frame

This lightweight pipeline enables **real-time lane detection** for ROS-based autonomous navigation.

**[Check out the Lane_Detection_CPP_ROS project on GitHub](https://github.com/chrissunny94/Lane_Detection_CPP_ROS)!**
