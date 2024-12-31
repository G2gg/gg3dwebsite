export const navLinks = [
    {
      id: 1,
      name: 'Home',
      href: '#home',
    },
    {
      id: 2,
      name: 'About',
      href: '#about',
    },
    {
      id: 3,
      name: 'Work',
      href: '#work',
    },
    {
      id: 4,
      name: 'Contact',
      href: '#contact',
    },
  ];
  
  export const clientReviews = [
    {
      id: 1,
      name: 'Emily Johnson',
      position: 'Marketing Director at GreenLeaf',
      img: 'assets/review1.png',
      review:
        'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
      id: 2,
      name: 'Mark Rogers',
      position: 'Founder of TechGear Shop',
      img: 'assets/review2.png',
      review:
        'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
      id: 3,
      name: 'John Dohsas',
      position: 'Project Manager at UrbanTech ',
      img: 'assets/review3.png',
      review:
        'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
      id: 4,
      name: 'Ether Smith',
      position: 'CEO of BrightStar Enterprises',
      img: 'assets/review4.png',
      review:
        'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
  ];
  
  export const myProjects = [
    {
      title: '3DOF Robotic Arm',
      desc: 'This is my first ROS2 (Robot Operating System 2) robot that I learned how to build from scratch, creating each and every package.',
      subdesc:
        'The robot has three degrees of freedom (DOF) and can pick up small objects (although for maximum reachability, an arm manipulator typically requires six DOF). In the video below, you’ll see an example of how it can be commanded to move using the terminal in a Linux system. Additionally, it can be controlled using Rviz, a 3D visualization program used with ROS2.',
      href: 'https://www.linkedin.com/posts/gunesh-gupta_ros2-ros-robotic-activity-7224655892263133184-p_Bf?utm_source=share&utm_medium=member_desktop',
      texture: 'textures/project/project1.mp4',
      logo: 'assets/ros2humble.png',
      logoStyle: {
        backgroundColor: '#2A1816',
        border: '0.2px solid #36201D',
        boxShadow: '0px 0px 60px 0px #AA3C304D',
      },
      spotlight: 'assets/spotlight1.png',
      tags: [
        {
          id: 1,
          name: 'ROS2 Humble',
          path: "assets/ros2humble.png",
        },
        {
          id: 2,
          name: 'Alexa',
          path: 'assets/alexa.png',
        },
        {
          id: 3,
          name: 'Gazebo Classic',
          path: 'assets/gazebo.png',
        },
        {
          id: 4,
          name: 'Rviz',
          path: 'assets/rviz.jpeg',
        },
      ],
    },
    {
        title: '3DOF Robotic Arm with Alexa Control',
        desc: 'Control the simulated 3DOF robot using Alexa voice commands.',
        subdesc:
          'In the video, when I say “check robot,” Alexa understands that the next command will operate the robot. Then, when I give the subsequent command “give me the pen,” the robot performs the action of picking up a pen (even though the pen isn’t currently in the simulation 😅) Additionally, I show how the robot remains under the control of MoveIt2 and Rviz applications, allowing manual positioning through their interfaces. All of this is achieved using ROS2 (Robot Operating System 2) Humble.',
        href: 'https://www.linkedin.com/posts/gunesh-gupta_ros-ros2-gazebo-activity-7224787797285466112-QV17?utm_source=share&utm_medium=member_desktop',
        texture: 'textures/project/project2.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight2.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Alexa',
            path: 'assets/alexa.png',
          },
          {
            id: 3,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 4,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
      {
        title: 'UR5e Robot in Moveit2',
        desc: 'Took a new challenge: controlling a 6DOF manipulator arm robot.',
        subdesc:
          'I extracted the inertial and positional values from its urdf.xacro file and then created all the necessary packages and configuration files to control the robot using Rviz2 and MoveIt2. (I have used ROS2 Humble). In the first part of the video, I demonstrated how to use MoveIt, and in the next part, I utilized terminal commands (“task_number”) to position the robot precisely.',
        href: 'https://www.linkedin.com/posts/gunesh-gupta_robotics-robots-ros2-activity-7225869350535118848-PLH7?utm_source=share&utm_medium=member_desktop',
        texture: 'textures/project/project3.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight3.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 3,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
      {
        title: 'Differential Drive Robot',
        desc: 'This is my first ROS2 (Robot Operating System 2) robot that I learned how to build from scratch, creating each and every package.',
        subdesc:
          'I showed that in an ideal environment, the smooth-lined graph displays ideal values. To make it work like a real motor, I added constant noise to it. To get the correct position and velocity of this real-environment robot, I learned to design and apply the Kalman Filter for this noise reduction. Finally I solved a problem that can show all the paths traveled by the robot in RVIZ2.',
        href: 'https://www.linkedin.com/posts/gunesh-gupta_robotics-ros-ros2-activity-7243799681728741376-kN9S?utm_source=share&utm_medium=member_desktop',
        texture: 'textures/project/project4.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight4.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 3,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
      {
        title: 'Hardware Assembly',
        desc: 'Showcasing full assembly and working of hardware assembled differential drive robot.',
        subdesc:
          'I have used DC Encoder Motors, Raspberry Pi 4, Arduino Nano, a DC to DC buck converter, an IMU sensor, and a LiPo battery, all controlled through ROS2 Humble. Building the logic for the robot’s accurate odometry control laid a foundational base for working with a wheeled robot and understanding the challenges it faces in a real environment (e.g., wheel slippage, encoder errors, localization using a Kalman filter, and sensor fusion).',
        href: 'https://www.linkedin.com/posts/gunesh-gupta_ros2-ros-robotics-activity-7244907582916591616-wWIt?utm_source=share&utm_medium=member_desktop',
        texture: 'textures/project/project5.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight5.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 3,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
      {
        title: 'Simulation of SLAM application process',
        desc: 'Step by step application of SLAM',
        subdesc:
          'In this video I have demonstrated how step by step the SLAM (Simultaneous Localization and Mapping) has been applied into the Gazebo simulation.',
        href: 'https://www.youtube.com/watch?v=X60DOE7PCYU',
        texture: 'textures/project/project6.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight2.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 3,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
      {
        title: 'SLAM on Real Robot',
        desc: 'Finally applied SLAM to my real hardware robot',
        subdesc:
          'This robot uses odometry feedback from the encoder DC geared motors and a RP LiDAR A1M8 sensor for mapping. For the project I have used Raspberry Pi 4, Arduino Nano, LiPo batteries, L298N motor driver, RP LiDAR, and encoder motors.',
        href: 'https://www.linkedin.com/posts/gunesh-gupta_ros2-ros-robotics-activity-7248612826477461504-QQ9j?utm_source=share&utm_medium=member_desktop',
        texture: 'textures/project/project7.mp4',
        logo: 'assets/ros2humble.png',
        logoStyle: {
          backgroundColor: '#2A1816',
          border: '0.2px solid #36201D',
          boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: 'assets/spotlight4.png',
        tags: [
          {
            id: 1,
            name: 'ROS2 Humble',
            path: "assets/ros2humble.png",
          },
          {
            id: 2,
            name: 'Gazebo Classic',
            path: 'assets/gazebo.png',
          },
          {
            id: 3,
            name: 'Rviz',
            path: 'assets/rviz.jpeg',
          },
        ],
      },
  ];
  
  export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
  };
  
  export const workExperiences = [
    {
      id: 1,
      name: 'B.Tech. CSE (Specialization in IOT and Robotics)',
      pos: 'Bennett University',
      duration: '2021 - 2025',
      title: "CGPA: 9.07 (Till 6th Semester)",
      icon: 'assets/Bennett_University.webp',
      animation: 'victory',
    },
    {
      id: 2,
      name: '12th Standard',
      pos: 'Central Board of Secondary Education',
      duration: '2018 - 2021',
      title: "Percentage: 84.2 %",
      icon: 'assets/cbse.png',
      animation: 'clapping',
    },
    {
      id: 3,
      name: '10th Standard',
      pos: 'Delhi Public School, Ranipur, Haridwar',
      duration: '2018',
      title: "Percentage: 95.8 %",
      icon: 'assets/dps.png',
      animation: 'salute',
    },
  ];
