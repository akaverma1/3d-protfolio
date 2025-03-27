import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import Image from "next/image";

import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import truncateText from "@/utils/truncate";
import GithubLogo from "./../public/assets/icons/github.svg";
import RocketLogo from "./../public/assets/icons/rocket.svg";

import { useState } from "react";


function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployed_link,
  type
}) {
  const CHAR_LIMIT = 280;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        onClick={() => setIsModalOpen(true)}
      >
        <Tilt
          tiltMaxAngleX="10"
          tiltMaxAngleY="10"
          className="dark:bg-bgSecondaryDark bg-bgSecondaryLight p-5 rounded-2xl sm:w-[370px] w-full h-fit min-h-[590px] shadow-sm shadow-primary cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative w-full h-[230px]">
            <div className="w-full h-full object-cover rounded-2xl relative">
              {type === "video" ? (
                <video
                  src={image}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Image
                  src={image}
                  alt="project_image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  className="object-cover"
                />
              )}
            </div>

         
          </div>

          <div className="mt-5">
            <h3 className="dark:text-ctnPrimaryDark text-ctnPrimaryLight font-bold text-[24px]">
              {name}
            </h3>
            <p className="mt-2 dark:text-ctnSecondaryDark text-ctnSecondaryLight text-[14px]">
              {truncateText(description, CHAR_LIMIT)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div
           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-bgSecondaryDark p-5 rounded-lg w-[90%] md:w-[70%] lg:w-[60%] flex flex-col md:flex-row items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-1 right-1 text-xl font-bold text-white bg-red-600 w-8 h-8 flex justify-center items-center rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            {/* Left Side - Title & Description */}
            <div className="w-full md:w-1/2 p-5">
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <p
                    key={`${name}-${tag.name}`}
                    className={`text-[14px] ${tag.color}`}
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Side - Video or Image */}
            <div className="w-full md:w-1/2 flex justify-center max-h-[90vh]">
              {type === "video" ? (
                <video src={image} controls autoPlay className="w-full p-2 rounded-lg" />
              ) : (
                <Image src={image} alt="project_image" width={500} height={300} className="rounded-lg max-h-[90vh] max-w-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}



function Works() {
  return (
    <section className="xl:my-36 md:mx-36 p-8 " id="projects">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >

        <h2 className={"sectionHeadText"}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 dark:text-ctnSecondaryDark text-ctnSecondaryLight text-[17px] max-w-3xl leading-[30px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          These projects showcase my practical skills and experience, each with
          descriptions and links to code repositories and live demos. They
          demonstrate my ability to handle complex challenges, adapt to
          different technologies, and oversee projects from start to finish.
        </motion.p>
      </div>

      <div className="md:mt-20 mt-10 flex justify-center flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Works;
