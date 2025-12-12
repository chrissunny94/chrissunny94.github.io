## Keeping Robots on Track: A C++ & ROS Lane Detection Project

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
<!-- Include Mermaid.js -->
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

<div class="mermaid">
graph TD
    A[ROS Camera Image] --> B[Convert ROS Image to OpenCV Mat]
    B --> C[Preprocessing]
    C --> C1[Grayscale Conversion]
    C --> C2[Gaussian Blur]
    C1 --> D[Edge Detection (Canny)]
    C2 --> D
    D --> E[Region of Interest (ROI Mask)]
    E --> F[Hough Line Transform]
    F --> G[Lane Classification & Averaging]
    G --> H[Draw Lane Lines on Frame]
    H --> I[Publish to ROS / Display in RViz]

    style A fill:#f9f,stroke:#333,stroke-width:1px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style C fill:#bfb,stroke:#333,stroke-width:1px
    style D fill:#ffb,stroke:#333,stroke-width:1px
    style E fill:#fbf,stroke:#333,stroke-width:1px
    style F fill:#fbb,stroke:#333,stroke-width:1px
    style G fill:#bff,stroke:#333,stroke-width:1px
    style H fill:#ff9,stroke:#333,stroke-width:1px
    style I fill:#9ff,stroke:#333,stroke-width:1px
</div>
</div>

---

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
