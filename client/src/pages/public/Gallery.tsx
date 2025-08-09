import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Folder {
  id: string;
  name: string;
  thumbnail: string;
  images: string[];
}

const initialFolders: Folder[] = [
  {
    id: "1",
    name: "EP_01",
    thumbnail: "/icons/folder.jpg",
    images: [
      "/images/summer1.jpg",
      "/images/summer2.jpg",
      "/images/summer3.jpg",
    ],
  },
  {
    id: "2",
    name: "EP_02",
    thumbnail: "/icons/folder.jpg",
    images: [
      "/images/winter1.jpg",
      "/images/winter2.jpg",
    ],
  },
];

const folderVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Gallery = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [openedFolder, setOpenedFolder] = useState<Folder | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setFolders(initialFolders);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Loading gallery...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!openedFolder ? (
          <motion.div
            key="folder-list"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
          >
            {folders.map(({ id, name, thumbnail }) => (
              <motion.div
                key={id}
                onClick={() =>
                  setOpenedFolder(folders.find((f) => f.id === id) ?? null)
                }
                className="flex flex-col items-center cursor-pointer p-4 bg-transparent"
                variants={folderVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={thumbnail}
                  alt={`${name} folder icon`}
                  className="w-20 h-20 mb-2"
                />
                <span className="text-center font-medium">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="folder-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
          >
            <button
              onClick={() => setOpenedFolder(null)}
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Back to folders
            </button>
            <h2 className="text-2xl font-semibold mb-4">{openedFolder.name}</h2>

            {openedFolder.images.length === 0 ? (
              <p className="text-gray-600">No images in this folder yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {openedFolder.images.map((imgSrc, idx) => (
                  <motion.img
                    key={idx}
                    src={imgSrc}
                    alt={`${openedFolder.name} image ${idx + 1}`}
                    className="w-full h-40 object-cover rounded shadow"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
