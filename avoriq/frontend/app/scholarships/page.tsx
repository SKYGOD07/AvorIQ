"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { mockScholarships } from "../../data/scholarships";
import ScholarshipCard from "../../components/ScholarshipCard";
import ScholarshipDetailModal from "../../components/ScholarshipDetailModal";
import { Scholarship } from "../../types/scholarship";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { AnimatePresence } from "framer-motion";

export default function ScholarshipsFinderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("avoriq_saved", []);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const handleToggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((x) => x !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter ? s.category === categoryFilter : true;
      const matchesEducation = educationFilter ? s.eligibility.educationLevel.includes(educationFilter) : true;
      
      return matchesSearch && matchesCategory && matchesEducation;
    });
  }, [searchQuery, categoryFilter, educationFilter]);

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Government", value: "Government" },
    { label: "Private", value: "Private" },
    { label: "NGO", value: "NGO" },
    { label: "International", value: "International" },
  ];

  const educationLevels = [
    { label: "All Levels", value: "" },
    { label: "Class 6–10", value: "Class 6–10" },
    { label: "Class 11–12", value: "Class 11–12" },
    { label: "Diploma", value: "Diploma" },
    { label: "Undergraduate (UG)", value: "UG" },
    { label: "Postgraduate (PG)", value: "PG" },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              Find Your{" "}
            </h1>
            <span className="heading-editorial text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-accent-emerald">
              Scholarship
            </span>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Discover opportunities that match your profile. Filter by category, education level, and more.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 shadow-lg shadow-black/20">
          <div className="flex-1">
            <Input
              placeholder="Search by name, provider or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5 text-slate-400" />}
              className="bg-background border-white/5 h-12 text-base rounded-xl"
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-medium"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <div className={`md:flex gap-4 ${showFilters ? 'flex flex-col' : 'hidden'}`}>
            <Select
              options={categories}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-background border-white/5 h-12 rounded-xl min-w-[200px]"
            />
            <Select
              options={educationLevels}
              value={educationFilter}
              onChange={(e) => setEducationFilter(e.target.value)}
              className="bg-background border-white/5 h-12 rounded-xl min-w-[200px]"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between text-sm text-slate-400 font-medium">
          <p>Showing <span className="text-white font-bold">{filteredScholarships.length}</span> results</p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Sorted by Deadline</span>
          </div>
        </div>

        {/* Scholarship Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  isSaved={savedIds.includes(scholarship.id)}
                  onToggleSave={(e) => handleToggleSave(e, scholarship.id)}
                  onOpenDetails={() => setSelectedScholarship(scholarship)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-20 text-center bg-surface/30 border border-white/5 rounded-3xl flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No scholarships found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              We couldn't find any scholarships matching your current filters. Try adjusting your search criteria or clearing filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setCategoryFilter(""); setEducationFilter(""); }}
              className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-white font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>

      {/* Scholarship Detail Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <ScholarshipDetailModal
            scholarship={selectedScholarship}
            isOpen={!!selectedScholarship}
            onClose={() => setSelectedScholarship(null)}
            isSaved={savedIds.includes(selectedScholarship.id)}
            onToggleSave={() => handleToggleSave({} as React.MouseEvent, selectedScholarship.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
