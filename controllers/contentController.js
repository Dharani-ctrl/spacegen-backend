import Content from '../models/Content.js';

// Get content for a specific section
export const getContent = async (req, res) => {
  try {
    const { section } = req.params;
    const content = await Content.findOne({ section });

    if (!content) {
      return res.status(404).json({ success: false, error: `Section ${section} not found` });
    }

    res.json({ success: true, data: content.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all content sections
export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update content for a section
export const updateContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    let content = await Content.findOne({ section });

    if (content) {
      content.data = data;
      content.lastUpdatedBy = req.admin.id;
      await content.save();
    } else {
      content = await Content.create({
        section,
        data,
        lastUpdatedBy: req.admin.id,
      });
    }

    res.json({
      message: `Section ${section} updated successfully`,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialize default content (Internal use/Bootstrap)
export const initContent = async (req, res) => {
  try {
    const defaultContent = [
      {
        section: 'hero',
        data: {
          title: 'Aviation Programme',
          subtitle: 'For School Students',
          highlights: [
            { title: 'IIT-Level Program', detail: "India's first aviation-focused IIT equivalent curriculum" },
            { title: 'On-Campus Flying Sim', detail: 'Certified flying simulation labs on campus' },
            { title: 'UAV / Drone / Rocket', detail: 'Conceptual and practical aerospace engineering' }
          ]
        }
      },
      {
        section: 'about',
        data: {
          title: 'About SpaceGen',
          description: 'SpaceGen Aviation stands at the forefront of the global aviation industry...',
          description2: 'With a fleet of 75 aircraft, our training programs...'
        }
      },
      {
        section: 'programs',
        data: {
          title: 'Aviation Adventure',
          subtitle: 'Join the most exciting aviation school for kids and future pilots!',
          programs: [
            {
              level: 'Level 1',
              title: 'Foundation Program',
              subtitle: 'Perfect for beginners',
              duration: '40 Hours',
              target: 'Class 4th - 12th',
              price: '₹15,000',
              features: [
                'Fun Pilot Training Games!',
                'Exciting In-Person Labs',
                'Wings of Wonder Program',
                'Fly a Simulator & Build Engines!',
                'Awesome Field Trips & Paragliding!',
              ],
              iconName: 'Rocket',
              gradient: 'from-blue-500/10 to-cyan-500/10',
              accentColor: 'bg-blue-600',
              borderColor: 'border-blue-200',
              glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
            },
            {
              level: 'Level 2',
              title: 'Advanced Program',
              subtitle: "Fully trained student pilot",
              duration: '80 Hours',
              target: 'Class 12th & Above',
              price: '₹35,000',
              features: [
                'Become a Young Pilot Expert!',
                'Learn from Real Engineers!',
                'Fly Your Own Drones (UAVs)!',
                'Get Your Own Aviation Kit!',
                'Professional Industry Certification',
              ],
              iconName: 'Plane',
              gradient: 'from-indigo-500/10 to-purple-500/10',
              accentColor: 'bg-indigo-600',
              borderColor: 'border-indigo-200',
              featured: true,
              glow: 'shadow-[0_0_40px_rgba(99,102,241,0.2)]',
            },
          ]
        }
      },
      {
        section: 'features',
        data: {
          title: 'Become a Young Space Expert!',
          subtitle: 'Experience 21 elite modules including workshops, exhibitions, multiple hands-on experiments, and insightful offline classes.',
          features: [
            {
              iconName: 'BookOpen',
              title: 'Fun Workshops',
              description: 'Get hands-on and build amazing things in our creative aviation workshops!',
              gradient: 'from-blue-500 to-cyan-500',
              badge: 'CREATE',
              badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
            },
            {
              iconName: 'Microscope',
              title: 'Learn to Fly!',
              description: 'Experience the thrill of being in a real cockpit with our cool simulators!',
              gradient: 'from-indigo-500 to-blue-500',
              badge: 'FLIGHT',
              badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
            },
            {
              iconName: 'Users',
              title: 'Meet Pilot Mentors',
              description: 'Ask questions and learn secrets from professional pilots and engineers!',
              gradient: 'from-cyan-500 to-teal-500',
              badge: 'FRIENDS',
              badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
            },
            {
              iconName: 'Target',
              title: 'Design Rockets!',
              description: 'Design, build, and test your very own rockets and flying drones!',
              gradient: 'from-blue-600 to-indigo-600',
              badge: 'BUILD IT',
              badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
            },
            {
              iconName: 'Globe',
              title: 'How Planes Work',
              description: 'Discover the science of how giant planes stay up in the sky!',
              gradient: 'from-teal-500 to-cyan-600',
              badge: 'SCIENCE',
              badgeColor: 'text-teal-600 bg-teal-50 border-teal-200',
            },
            {
              iconName: 'Lightbulb',
              title: 'Space Field Trips',
              description: 'Go on exciting adventures to air bases and watch the stars!',
              gradient: 'from-indigo-500 to-purple-500',
              badge: 'ADVENTURE',
              badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
            },
          ],
          benefits: [
            'Career Guidance & Quizzes',
            'Space Watch Program',
            'Foreign Student Interaction',
            'Defence Exam Preparation (Optional)',
            'Aerospace Innovation in Rocket Design',
            'Aerial Operations and Flight Testing',
          ],
          stats: [
            {
              value: '60+ Hrs',
              label: 'Sessions & Classes',
              detail: 'Total hands-on sessions and online classes',
              badge: 'TOTAL',
              gradient: 'from-blue-600 to-cyan-600',
              badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
              border: 'border-blue-200',
            },
            {
              value: '40+ Hrs',
              label: 'Online Sessions',
              detail: 'Interactive live streaming masterclasses via Zoom',
              badge: 'ONLINE',
              gradient: 'from-indigo-600 to-purple-600',
              badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              border: 'border-indigo-200',
            },
            {
              value: '20+ Hrs',
              label: 'Hands-on Sessions',
              detail: 'Live aircraft demo, flight simulations, and droning',
              badge: 'PRACTICAL',
              gradient: 'from-cyan-600 to-teal-600',
              badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
              border: 'border-cyan-200',
            },
          ]
        }
      }
    ];

    for (const item of defaultContent) {
      await Content.findOneAndUpdate(
        { section: item.section },
        { $setOnInsert: item },
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Default content initialized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
