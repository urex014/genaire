// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} ClothBrand. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
