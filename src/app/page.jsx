"use client";
import { useState, useEffect } from 'react';
import { getAllJobPosts } from '@/lib/firebase';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, Search, X, Filter } from 'lucide-react';
import Link from 'next/link';
import HeroSection from "@/components/custom/Landing/HeroSection";
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import ATSFor from "@/components/custom/Landing/ATSFor";
import About from "@/components/custom/Landing/About";
import CareerNetwork from "@/components/custom/Landing/CareerNetwork";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      setError('');
      
      try {
        const { success, jobPosts, error } = await getAllJobPosts();
        
        if (success) {
          setJobs(jobPosts);
        } else {
          throw new Error(error || 'Failed to fetch job listings');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <HeroSection />
      <CareerNetwork />
      <ATSFor />
      <About />
      <Footer />
      <ChatBotWrapper />
    </div>
  );
}
