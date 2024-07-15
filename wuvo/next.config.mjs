/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["avatars.githubusercontent.com","res.cloudinary.com", "lh3.googleusercontent.com"]
    },
    ignoreBuildErrors: true
};

export default nextConfig;
