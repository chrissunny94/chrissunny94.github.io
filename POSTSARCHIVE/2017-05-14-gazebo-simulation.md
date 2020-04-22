---
author: someone
layout: post-full
type: youtube
yt-video-id: -_WT1Vd2T18
homedisplay: iframe
title: Gazebo simulation
tags: [video, iframe,gazebo,ros,simulation,large_map]
category: [video]
---
This is a large map of the gazebo simulation that i made. 


[Github Link of the project](https://github.com/chrissunny94/husky)

Large map on Gazebo
-------------------

#### Instructions
============

    roslaunch husky_gazebo husky_playpen.launch

For Husky instructions and tutorials, please see  [http://wiki.ros.org/Robots/Husky](http://wiki.ros.org/Robots/Husky)

#### To launch fiducial_slam
============================

    roslaunch fiducial_slam aurco.launch

This will also launch the robot_localization and config is included with this .

Let me try to break down the packages within a ROS simulation which is capable of S.L.A.M .

- **description**
    
    This package contains the URDF model of the robot
- **control**
  
  This package generally pertains to Joint Publishers and Other Joint controllers
- **navigation**
  
  This package contains basic slam such as Gmapping , AMCL ,Hector SLAM etc
- **viz**
  
  This package deals with launchin the RVIZ configurations
- **gazebo**
  
  This package deals witch spawning the robot_description and linking it with the gazebo world model



