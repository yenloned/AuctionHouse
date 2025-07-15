// Configuration for backend services
export const config = {
  // Backend API URL
  API_BASE_URL: "https://auction-house-backend.vercel.app",
  
  // Socket server URL
  SOCKET_URL: "https://auction-house-socket.vercel.app",
  
  // GraphQL endpoint
  get GRAPHQL_URL() {
    return `${this.API_BASE_URL}/graphql/`;
  },
  
  // Cloudinary upload endpoint
  get CLOUDINARY_UPLOAD_URL() {
    return `${this.API_BASE_URL}/cloudinary/uploadIcon`;
  }
} as const; 