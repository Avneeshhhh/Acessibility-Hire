"use client";
import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreeTry = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === "application/pdf" || 
        file.type === "application/msword" || 
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(file);
    } else {
      alert("Please upload a PDF or Word document");
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background Effects - keeping the same theme as landing */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full filter blur-[80px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-40 left-20 w-72 h-72 bg-blue-400/20 rounded-full filter blur-[80px]"
        />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Left Side - Upload Section */}
          <div className="w-full md:w-1/2 p-8">
            <motion.label 
              htmlFor="dropzone-file"
              className={`relative w-full h-full border-2 border-dashed rounded-xl backdrop-blur-sm flex flex-col items-center justify-center p-12 transition-all duration-300 cursor-pointer
                ${dragActive 
                  ? 'border-violet-600 bg-violet-100/50 shadow-lg scale-[1.02]' 
                  : 'border-violet-300 hover:border-violet-400 bg-violet-50/50 hover:bg-violet-50/80 hover:scale-[1.01]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
              
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <Upload className="w-20 h-20 text-violet-400 mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">Upload CV/Resume here</h3>
                    <p className="text-gray-500 text-center text-lg mb-2">
                      Drag and drop your file here or click to browse
                    </p>
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Supported formats: PDF, DOCX, DOC
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{file.name}</h3>
                    <p className="text-violet-600 font-medium">File ready for analysis</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.label>
          </div>

          {/* Right Side - Analysis Section */}
          <div className="w-full md:w-1/2 p-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg h-full border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">How It Works</h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Upload Your Resume",
                    description: "Upload your CV or resume in any supported format. Our system will process your document securely.",
                    delay: 0.3
                  },
                  {
                    title: "Analysis Process",
                    description: "Our system will analyze your resume for key components including skills, experience, and qualifications.",
                    delay: 0.4
                  },
                  {
                    title: "Get Insights",
                    description: "Receive detailed analytics about your resume including skills assessment, experience analysis, formatting review, and industry alignment.",
                    delay: 0.5
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: step.delay }}
                    className="space-y-2"
                  >
                    <h3 className="text-lg font-semibold text-violet-600 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 ml-8">{step.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 p-4 bg-violet-50 rounded-lg border border-violet-100"
              >
                <p className="text-sm text-gray-600">
                  Note: This is a preliminary analysis tool. For more detailed insights and personalized recommendations, consider booking a demo with our team.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeTry;
