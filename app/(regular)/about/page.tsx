import React from 'react';
import Image from 'next/image';
import { SiX, SiGithub } from '@icons-pack/react-simple-icons'

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full mt-16 pb-20">
            <div className="w-full max-w-7xl flex flex-col items-center px-4 mt-24 space-y-12">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-center">The Challenge of Finding Open Source Projects</h1>
                    <p className="text-lg text-gray-600 text-center">
                        Contributing to open-source software (OSS) is a rewarding experience, but finding the right projects can be daunting.
                        Many developers struggle to identify projects that align with their skills and interests, leading to frustration and missed opportunities.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-center">Why is it Difficult?</h2>
                    <ul className="flex flex-col space-y-4 text-white font-bold list-inside">
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 hover:rotate-2 transition-all duration-300 bg-rose-600 p-4 rounded-md shadow-lg -rotate-2'>
                            <span className="text-2xl">👀</span>
                            <span className="text-center">Limited visibility of projects that need help in specific areas.</span>
                        </li>
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 hover:rotate-1 transition-all duration-300 bg-rose-600 p-4 rounded-md shadow-lg -rotate-1'>
                            <span className="text-2xl">📚</span>
                            <span className="text-center">Lack of clear guidelines on how to contribute.</span>
                        </li>
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 hover:-rotate-2 transition-all duration-300 bg-rose-600 p-4 rounded-md shadow-lg rotate-2'>
                            <span className="text-2xl">🔍</span>
                            <span className="text-center">Difficulty in assessing the health and activity of a project.</span>
                        </li>


                    </ul>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-center">How Contribhub Helps</h2>
                    <p className="text-lg text-gray-600 text-center">
                        Contribhub is designed to simplify the process of finding open-source projects to contribute to.
                        Our platform connects developers with projects that match their skills and interests, making it easier to get involved.
                    </p>
                    <ul className="flex flex-col items-center space-y-4 text-white font-bold list-inside">
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 bg-teal-600 p-4 rounded-full shadow-lg w-fit'>
                            <span className="text-2xl">📋</span>
                            <span className="text-center">Curated lists of projects based on various categories and needs.</span>
                        </li>
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 bg-teal-600 p-4 rounded-full shadow-lg w-fit'>
                            <span className="text-2xl">📝</span>
                            <span className="text-center">Detailed project descriptions and contribution guidelines.</span>
                        </li>
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 bg-teal-600 p-4 rounded-full shadow-lg w-fit'>
                            <span className="text-2xl">🔎</span>
                            <span className="text-center">Search and filter options to find projects that match your skills.</span>
                        </li>
                        <li className='flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 bg-teal-600 p-4 rounded-full shadow-lg w-fit'>
                            <span className="text-2xl">🤝</span>
                            <span className="text-center">Community support and resources to help you get started.</span>
                        </li>
                    </ul>
                </div>



                <div className="w-full max-w-4xl flex flex-col items-center py-10 px-4 mt-24 space-y-8">
                    <h2 className="text-3xl font-semibold text-center">About Me</h2>
                    <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-14">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-8 border-white">
                                <img
                                    src="https://github.com/swve.png"
                                    alt="Profile picture"
                                    width={192}
                                    height={192}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/swve"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 transition-colors duration-300 rounded-full flex items-center space-x-2"
                                >
                                    <SiGithub size={20} />
                                    <span>GitHub</span>
                                </a>
                                <a
                                    href="https://twitter.com/swveio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-sky-600 text-white px-4 py-2 hover:bg-sky-500 transition-colors duration-300 rounded-full flex items-center space-x-2"
                                >
                                    <SiX size={20} />
                                    <span>Twitter/X</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Hi there! I'm the creator of ContribHub, passionate about open-source and making it more accessible to everyone. With years of experience in software development, I've seen firsthand the challenges developers face when trying to contribute to open-source projects.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                My mission is to bridge the gap between eager developers and open-source projects that need their skills. Through Contribhub, I aim to create a vibrant community where collaboration thrives and innovation flourishes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
