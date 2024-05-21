import Link from 'next/link';
import { useState } from 'react';

const HeroSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBranchesDropdown, setShowBranchesDropdown] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleBranchesMouseEnter = () => {
    setShowBranchesDropdown(true);
  };

  const handleBranchesMouseLeave = () => {
    setShowBranchesDropdown(false);
  };

  const handleBranchClick = (branchName: string) => {
    setSelectedBranch(branchName);
    setShowBranchesDropdown(false);
  };

  return (
    <div className="relative">
      <nav className="bg-blue-900 p-5 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <img src="https://d2lk14jtvqry1q.cloudfront.net/media/large_243_79d258292c_b9de0c1ce3.png" alt="SVECW Logo" className="h-10" />
          </Link>
        </div>
        <ul className="flex space-x-5 text-white">
          <li>
            <Link href="/about">
              <div className="cursor-pointer">About Us</div>
            </Link>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <div className="cursor-pointer">Departments</div>
            {showDropdown && (
              <ul className="absolute left-0 mt-2 bg-gray-800 rounded-lg shadow-lg p-2 space-y-2 z-10">
                <li>
                  <Link href="/departments/cse">
                    <div className="text-white hover:bg-blue-500 p-2 rounded">Computer Science & Engineering (CSE)</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/aiml">
                    <div className="text-white hover:bg-blue-500 p-2 rounded">Artificial Intelligence & Machine Learning (AIML)</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/arts">
                    <div className="text-white hover:bg-blue-500 p-2 rounded">Arts</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/mechanical">
                    <div className="text-white hover:bg-blue-500 p-2 rounded">Mechanical Engineering</div>
                  </Link>
                </li>
                <li>
                  <Link href="/departments/civil">
                    <div className="text-white hover:bg-blue-500 p-2 rounded">Civil Engineering</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={handleBranchesMouseEnter}
            onMouseLeave={handleBranchesMouseLeave}
            className="relative"
          >
            <div className="cursor-pointer">Branches</div>
            {showBranchesDropdown && (
              <ul className="absolute left-0 mt-2 bg-gray-800 rounded-lg shadow-lg p-2 space-y-2 z-10">
                <li onClick={() => handleBranchClick('Bhimavaram')}>
                  <div className="text-white hover:bg-green-500 p-2 rounded">Bhimavaram</div>
                </li>
                <li onClick={() => handleBranchClick('Hyderabad')}>
                  <div className="text-white hover:bg-blue-500 p-2 rounded">Hyderabad</div>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/login">
              <div className="cursor-pointer">Login</div>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <div className="cursor-pointer">Signup</div>
            </Link>
          </li>
          <li>
            <Link href="/StudentsPage">
              <div className="cursor-pointer">Students</div>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <div className="cursor-pointer">Contact Us</div>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="bg-gradient-to-r from-blue-900 to-blue-400 p-20 text-center text-white">
        <div className="text-3xl italic font-semibold">“Empowering Women Through Engineering Excellence”</div>
      </section>
      {selectedBranch && (
        <div className={`fixed top-1/2 right-5 transform -translate-y-1/2 text-white p-5 rounded-lg shadow-lg z-50 ${selectedBranch === 'Hyderabad' ? 'bg-blue-900' : 'bg-green-500'}`}>
          {selectedBranch}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
