import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  about: {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    images: [String], 
  },
  projects: [
    {
      title: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      video: { 
        type: String 
      }, 
      metadata: {
        year: { 
          type: Number 
        },
        client: {
           type: String 
          }
      }
    }
  ],
  services: [
    {
      title: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      }
    }
  ],
  contactInfo: {
    email: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    }
  },
  locations: [
    {
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      },
      address: { type: String }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Content = mongoose.model("Content", contentSchema);
export default Content;




//This Sample Understanding Input for this you will understand How to build Frontend 

// {
//   "about": {
//     "title": "About Us",
//     "description": "This is the about section description.",
//     "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
//   },
//   "projects": [
//     {
//       "title": "Project 1",
//       "description": "Description of project 1",
//       "video": "https://example.com/project1.mp4",
//       "metadata": {
//         "year": 2023,
//         "client": "Client A"
//       }
//     },
//     {
//       "title": "Project 2",
//       "description": "Description of project 2",
//       "video": "https://example.com/project2.mp4",
//       "metadata": {
//         "year": 2024,
//         "client": "Client B"
//       }
//     }
//   ],
//   "services": [
//     {
//       "title": "Service 1",
//       "description": "Description of service 1"
//     },
//     {
//       "title": "Service 2",
//       "description": "Description of service 2"
//     }
//   ],
//   "contactInfo": {
//     "email": "info@example.com",
//     "phone": "+123456789",
//     "address": "123 Example Street, City, Country"
//   },
//   "locations": [
//     {
//       "coordinates": {
//         "lat": 40.7128,
//         "lng": -74.0060
//       },
//       "address": "New York, USA"
//     },
//     {
//       "coordinates": {
//         "lat": 34.0522,
//         "lng": -118.2437
//       },
//       "address": "Los Angeles, USA"
//     }
//   ]
// }
