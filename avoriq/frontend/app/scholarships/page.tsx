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
        {/* Header */}
        <div className="mb-10">
          <span className="text-bauhaus-red text-[10px] font-black uppercase tracking-[0.3em] block mb-3">Match Engine</span>
          <h1 className="text-foreground text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95]">
            FIND YOUR<br />
            <span className="text-bauhaus-red">SCHOLARSHIP</span>
          </h1>
          <div className="w-24 h-[3px] bg-bauhaus-red mt-4 mb-4" />
          <p className="text-slate-500 text-sm max-w-lg uppercase tracking-wider font-medium">
            Discover opportunities that match your profile. Filter by category, education level, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface border-2 border-[#333] p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="SEARCH BY NAME OR PROVIDER..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5 text-slate-500" />}
              className="h-12 text-sm"
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 h-12 px-4 bg-surface-2 border-2 border-[#333] text-slate-400 font-black text-xs uppercase tracking-widest"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <div className={`md:flex gap-4 ${showFilters ? 'flex flex-col' : 'hidden'}`}>
            <Select options={categories} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-12 min-w-[200px]" />
            <Select options={educationLevels} value={educationFilter} onChange={(e) => setEducationFilter(e.target.value)} className="h-12 min-w-[200px]" />
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between text-[10px] text-slate-500 font-black uppercase tracking-widest">
          <p>Showing <span className="text-foreground">{filteredScholarships.length}</span> results</p>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>By Deadline</span>
          </div>
        </div>

        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
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
          <div className="py-20 text-center bg-surface border-2 border-[#333] flex flex-col items-center">
            <Search className="w-10 h-10 text-slate-600 mb-4" />
            <h3 className="text-lg font-black uppercase tracking-wider text-foreground mb-2">No Results</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto uppercase tracking-wider">
              Try adjusting your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setCategoryFilter(""); setEducationFilter(""); }}
              className="mt-6 px-6 py-2.5 bg-foreground text-background font-black text-xs uppercase tracking-widest border-2 border-foreground hover:bg-transparent hover:text-foreground transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

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
