"use client";

import { useState, useEffect } from "react";
import { mockScholarships } from "../../data/scholarships";
import { Scholarship, StudentProfile } from "../../types/scholarship";
import { filterAndSearchScholarships, MatchResult } from "../../utils/matcher";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ScholarshipFinderForm from "../../components/ScholarshipFinderForm";
import ScholarshipCard from "../../components/ScholarshipCard";
import ScholarshipDetailModal from "../../components/ScholarshipDetailModal";
import AiAssistant from "../../components/AiAssistant";
import { Search, SlidersHorizontal, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function ScholarshipsPage() {
  const [profile, setProfile] = useLocalStorage<StudentProfile | null>("avoriq_profile", null);
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("avoriq_saved", []);

  const [searchQuery, setSearchQuery] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [providerFilter, setProviderFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Compute filtered matches when inputs change
  useEffect(() => {
    const results = filterAndSearchScholarships(
      mockScholarships,
      profile,
      searchQuery,
      minAmount,
      categoryFilter,
      providerFilter,
      sortBy
    );
    setMatches(results);
  }, [profile, searchQuery, minAmount, categoryFilter, providerFilter, sortBy]);

  const handleProfileSubmit = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    // Success party celebration!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 }
    });
  };

  const handleClearProfile = () => {
    setProfile(null);
  };

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((x) => x !== id));
    } else {
      setSavedIds([...savedIds, id]);
      confetti({
        particleCount: 30,
        spread: 30,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-left space-y-2">
          <span className="text-accent-purple text-xs font-bold uppercase tracking-wider block">
            Intelligence Engine
          </span>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
            Find Your Scholarships
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Answer a few questions to run our AI-matching checks and discover opportunities custom-tailored to your academic profile.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Finder Form & Filters) - Col Span 4 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profiler Status Panel */}
            {profile && (
              <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-emerald-500/20 bg-emerald-500/[0.01]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-2xs uppercase tracking-wider font-bold block">Status</span>
                    <span className="text-white text-xs font-semibold">Matched for {profile.name}</span>
                  </div>
                </div>
                <button
                  onClick={handleClearProfile}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-2xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear Setup
                </button>
              </div>
            )}

            {/* Profile Form */}
            <ScholarshipFinderForm
              onSubmit={handleProfileSubmit}
              initialProfile={profile}
            />

            {/* Sidebar Filters */}
            <div className="glass-panel p-6 rounded-3xl space-y-5">
              <h3 className="text-white text-sm font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-slate-400" />
                Refine Search Filters
              </h3>

              {/* Amount range */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Min Scholarship Value</span>
                  <span className="text-white font-bold">₹{minAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  step="10000"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-blue"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold">Scholarship Type</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl glass-input text-white cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Government">Government Sponsored</option>
                  <option value="Private">Private Corporate (CSR)</option>
                  <option value="NGO">NGOs & Charities</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Provider Filter */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-semibold">Provider Origin</label>
                <select
                  value={providerFilter}
                  onChange={(e) => setProviderFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl glass-input text-white cursor-pointer"
                >
                  <option value="All">All Providers</option>
                  <option value="Government">Official Government</option>
                  <option value="Private">Corporate/Private</option>
                  <option value="NGO">Charities/NGOs</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>
          </div>

          {/* Middle Area (Results & Search Box) - Col Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Search and Sort Controller */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, provider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl glass-input text-white"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <span className="text-slate-500 text-2xs uppercase tracking-wider font-bold">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg glass-input text-white cursor-pointer focus:bg-navy-card"
                >
                  <option value="Most Popular">Matching Score</option>
                  <option value="Highest Amount">Highest Value</option>
                  <option value="Nearest Deadline">Nearest Deadline</option>
                  <option value="Newest">Newest Added</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-slate-400 text-xs font-medium">
                  Showing {matches.length} matching opportunities
                </span>
                {profile && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Profile Active
                  </span>
                )}
              </div>

              {matches.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {matches.map(({ scholarship, score }) => (
                    <ScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                      isSaved={savedIds.includes(scholarship.id)}
                      onToggleSave={() => handleToggleSave(scholarship.id)}
                      onOpenDetails={() => setSelectedScholarship(scholarship)}
                      matchScore={profile ? score : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-8 text-center rounded-2xl border border-white/5 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-base">No Matching Scholarships</h4>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                      Try expanding your search query, lowering your minimum amount slider, or clearing your profile inputs above.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (AI Assistant Sidebar Widget) - Col Span 3 */}
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-24">
              <div className="mb-4">
                <h3 className="text-white text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-purple" />
                  Ask AI Companion
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Simulate standard student queries instantly below.
                </p>
              </div>
              <AiAssistant />
            </div>
          </div>

        </div>
      </div>

      {/* Details Modal overlay */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isOpen={true}
          onClose={() => setSelectedScholarship(null)}
          isSaved={savedIds.includes(selectedScholarship.id)}
          onToggleSave={() => handleToggleSave(selectedScholarship.id)}
        />
      )}
    </div>
  );
}
