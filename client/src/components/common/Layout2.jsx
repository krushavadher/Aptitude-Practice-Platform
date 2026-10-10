export function Footer() {
  return (
    <footer className="bg-[#E3F4EA] py-16 px-4 border-t border-[#D1F0DE]">
      <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2.5 focus-visible rounded-lg px-2 py-1 -ml-2">
            <div className="w-8 h-8 rounded-lg bg-[#14724F] text-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m3 21 9-18 9 18"/><path d="M7 13h10"/></svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#10241E]">AptiFlow</span>
          </Link>
          <p className="text-[13px] text-[#5B6F67] leading-[1.6] font-medium max-w-[280px]">
            Aptitude prep built for peak performance in campus placements and competitive examinations.
          </p>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-black text-[#10241E] tracking-widest uppercase mb-6">Product</h4>
          <ul className="space-y-4 text-[13px] font-medium text-[#5B6F67]">
            <li><Link to="/topics" className="hover:text-[#14724F] transition-colors">Topics</Link></li>
            <li><Link to="/timed-tests" className="hover:text-[#14724F] transition-colors">Timed Tests</Link></li>
            <li><Link to="/explanations" className="hover:text-[#14724F] transition-colors">Explanations</Link></li>
            <li><Link to="/leaderboard" className="hover:text-[#14724F] transition-colors">Leaderboard</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-black text-[#10241E] tracking-widest uppercase mb-6">Resources</h4>
          <ul className="space-y-4 text-[13px] font-medium text-[#5B6F67]">
            <li><Link to="/formula-sheet" className="hover:text-[#14724F] transition-colors">Aptitude Formula Sheet</Link></li>
            <li><Link to="/placement-papers" className="hover:text-[#14724F] transition-colors">Placement Papers</Link></li>
            <li><Link to="/blog" className="hover:text-[#14724F] transition-colors">Blog</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-black text-[#10241E] tracking-widest uppercase mb-6">Company</h4>
          <ul className="space-y-4 text-[13px] font-medium text-[#5B6F67]">
            <li><Link to="/about" className="hover:text-[#14724F] transition-colors">About</Link></li>
            <li><Link to="/quality" className="hover:text-[#14724F] transition-colors">Quality Standards</Link></li>
            <li><Link to="/privacy" className="hover:text-[#14724F] transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-[#14724F] transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
