import Content from "../models/content.model.js";
import httpStatus from "http-status";



export const getContent = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
    }
    return res.status(httpStatus.OK).json({ content });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
  }
};

export const createContent = async (req, res) => {
    try {

      const { about, projects, services, contactInfo, locations } = req.body;
  
      const newContent = new Content({
        about,       // Object
        projects,    // Array of objects
        services,    // Array of objects
        contactInfo, // Object
        locations,   // Array of objects
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
  
      const savedContent = await newContent.save();
  
      return res.status(201).json({ message: "Content created successfully", content: savedContent });
  
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  };
  

export const updateAboutSection = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, description, images } = req.body;

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
    }

    content.about = { title, description, images };
    content.updatedAt = Date.now();

    await content.save();

    return res.status(httpStatus.OK).json({ message: "About section updated successfully", content: content.about });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
  }
};


// Update the Projects section
export const updateProjectsSection = async (req, res) => {
    try {
      const { contentId } = req.params;
      const { projects } = req.body;
  
      const content = await Content.findById(contentId);
      if (!content) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
      }
  
      content.projects = projects;
      content.updatedAt = Date.now();
  
      await content.save();
      return res.status(httpStatus.OK).json({ message: "Projects section updated successfully", content: content.projects });
  
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
    }
  };
  
// Update the Services section
export const updateServicesSection = async (req, res) => {
    try {
      const { contentId } = req.params;
      const { services } = req.body;
  
      const content = await Content.findById(contentId);
      if (!content) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
      }
  
      content.services = services; 
      content.updatedAt = Date.now();
  
      await content.save();
      return res.status(httpStatus.OK).json({ message: "Services section updated successfully", content: content.services });
  
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
    }
  };
  
// adding services without replacing
  export const addService = async (req, res) => {
    try {
      const { contentId } = req.params;
      const { title, description } = req.body;
  
      const content = await Content.findById(contentId);
      if (!content) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
      }

      content.services.push({ title, description });
      content.updatedAt = Date.now();
  
      await content.save();
      return res.status(httpStatus.OK).json({ message: "Service added successfully", content: content.services });
  
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
    }
  };
  

  export const addProject = async (req, res) => {
    try {
      const { contentId } = req.params;
      const { title, description, video, metadata } = req.body;
  
      const content = await Content.findById(contentId);
      if (!content) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Content not found" });
      }
  
      // Add new project to the projects array
      content.projects.push({ title, description, video, metadata });
      content.updatedAt = Date.now();
  
      await content.save();
      return res.status(httpStatus.OK).json({ message: "Project added successfully", content: content.projects });
  
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error.message}` });
    }
  };


  // Update "Contact Us" section
export const updateContactUs = async (req, res) => {
    try {
        const { contentId } = req.params;
        const { contactInfo } = req.body;

        const content = await Content.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Update Contact Us section
        content.contactInfo = contactInfo;
        content.updatedAt = Date.now();

        await content.save();
        return res.status(200).json({ message: "Contact Us section updated", content });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
};

// Update Locations section
export const updateLocation = async (req, res) => {
    try {
        const { contentId } = req.params;
        const { coordinates, address } = req.body;

        const content = await Content.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Update location info
        content.locations.push({ coordinates, address });
        content.updatedAt = Date.now();

        await content.save();
        return res.status(200).json({ message: "Location updated", content });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
};
  
  
//About
// {
//     "about": {
//       "title": "Updated About Us",
//       "description": "We have expanded our operations worldwide.",
//       "images": [
//         "https://example.com/images/about-updated1.jpg",
//         "https://example.com/images/about-updated2.jpg"
//       ]
//     }
//   }
  

// {
//     "projects": [
//       {
//         "title": "New Project Gamma",
//         "description": "Project Gamma focuses on cloud computing solutions.",
//         "video": "https://example.com/videos/project-gamma.mp4",
//         "metadata": {
//           "year": 2025,
//           "client": "Client Z"
//         }
//       }
//     ]
//   }
  

// {
//     "services": [
//       {
//         "title": "Updated Service 1",
//         "description": "We have updated our consulting services."
//       },
//       {
//         "title": "Updated Service 2",
//         "description": "Our development services now include AI solutions."
//       }
//     ]
//   }

// {
//     "contactInfo": {
//       "email": "newemail@company.com",
//       "phone": "+987654321",
//       "address": "456 Future Avenue, New City, Country"
//     }
//   }
  

// {
//     "locations": [
//       {
//         "coordinates": {
//           "lat": 48.8566,
//           "lng": 2.3522
//         },
//         "address": "Paris, France"
//       }
//     ]
//   }
  