import { motion } from "framer-motion";

const infoData = [
  {
    title: "Refunds & Cancellations",
    description:
      "All sales are final. Refunds are only offered if the item is unavailable or lost in transit.",
  },
  {
    title: "Shipping Policy",
    description:
      "PLEASE CONFIRM BY READING DELIVERY INFORMATION OF EACH ITEM. Also, ensure you provide a valid email and phone number when placing an order to avoid communication issues.",
  },
  {
    title: "Contact",
    description: "EMAIL: genaire@gmail.com",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.12)",
    transition: { duration: 0.3 },
  },
};

const Info = () => {
  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
    {infoData.map(({ title, description }, idx) => (
      <motion.article
        key={idx}
        custom={idx}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="border rounded-md p-6 bg-white/70 cursor-pointer min-h-[200px] w-full"
      >
        <h2 className="font-bold text-2xl mb-2 text-black">{title}</h2>
        <p className="text-gray-800 leading-relaxed">{description}</p>
      </motion.article>
    ))}
  </div>
</section>

  );
};

export default Info;
