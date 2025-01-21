import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, 
  faClock, 
  faGlobe, 
  faPoll,
  faVideo,
  faUserEdit,
  faChartLine,
  faComments,
  faBolt
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('featured');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [pollVotes, setPollVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0
  });

  // Simulated news data with enhanced content types
  const simulatedNews = [
    {
      title: "Quantum Computing Breakthrough: New Record in Qubit Stability",
      description: "Scientists achieve unprecedented 10-minute coherence time in superconducting qubits, marking a major milestone in quantum computing.",
      publishedAt: new Date().toISOString(),
      category: "Emerging Tech",
      type: "expert",
      author: "Dr. Sarah Chen",
      authorTitle: "Quantum Computing Researcher",
      readTime: "5 min read",
      engagement: {
        comments: 42,
        shares: 156
      }
    },
    {
      title: "LIVE: AI Summit 2024",
      description: "Live coverage of the biggest AI conference. Currently streaming: 'The Future of Large Language Models' panel discussion.",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: "Live Event",
      type: "live",
      viewers: 1234,
      status: "LIVE NOW"
    },
    {
      title: "Weekly Poll: Will Quantum Computers Break Current Encryption by 2025?",
      description: "Join the discussion and cast your vote on this crucial cybersecurity question.",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      category: "Interactive",
      type: "poll",
      totalVotes: 892
    },
    {
      title: "Community Spotlight: Building a Sustainable Tech Future",
      description: "User-submitted article by Maria Garcia on how tech companies are adopting green practices.",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      category: "Community",
      type: "user-generated",
      author: "Maria Garcia",
      authorType: "Community Contributor",
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setNews(simulatedNews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVote = (option) => {
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  const renderArticleCard = (article) => {
    switch (article.type) {
      case 'live':
        return (
          <article className="news-card rounded-lg p-6 border-cyber-pink">
            <div className="flex items-center gap-2 text-cyber-pink mb-3">
              <FontAwesomeIcon icon={faVideo} className="animate-pulse" />
              <span className="text-sm bg-cyber-pink text-black px-2 py-1 rounded-full">{article.status}</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-cyber-pink">{article.title}</h2>
            <p className="text-gray-300 mb-4">{article.description}</p>
            <div className="flex justify-between items-center text-sm text-cyber-pink">
              <span><FontAwesomeIcon icon={faGlobe} /> {article.viewers} watching</span>
              <button className="px-4 py-2 bg-cyber-pink/20 hover:bg-cyber-pink/30 rounded-md transition-colors">
                Join Stream
              </button>
            </div>
          </article>
        );

      case 'poll':
        return (
          <article className="news-card rounded-lg p-6 border-cyber-blue">
            <div className="flex items-center gap-2 text-cyber-blue mb-3">
              <FontAwesomeIcon icon={faPoll} />
              <span className="text-sm">Interactive Poll</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-cyber-blue">{article.title}</h2>
            <div className="space-y-3 mb-4">
              {['Yes', 'No', 'Uncertain'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleVote(`option${index + 1}`)}
                  className="w-full p-2 border border-cyber-blue/50 rounded hover:bg-cyber-blue/20 transition-colors text-left"
                >
                  <span className="flex justify-between">
                    <span>{option}</span>
                    <span>{pollVotes[`option${index + 1}`]} votes</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="text-sm text-cyber-blue">
              Total votes: {Object.values(pollVotes).reduce((a, b) => a + b, 0)}
            </div>
          </article>
        );

      default:
        return (
          <article className="news-card rounded-lg p-6">
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <FontAwesomeIcon icon={article.type === 'expert' ? faChartLine : faUserEdit} />
              <span className="text-sm">{article.category}</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-cyan-100">{article.title}</h2>
            <p className="text-gray-300 mb-4">{article.description}</p>
            {article.author && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-cyan-100">{article.author}</div>
                  <div className="text-sm text-cyan-400">{article.authorTitle || article.authorType}</div>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-cyan-500">
              <span>{format(new Date(article.publishedAt), 'HH:mm')}</span>
              <div className="flex gap-4">
                {article.engagement && (
                  <>
                    <span><FontAwesomeIcon icon={faComments} /> {article.engagement.comments}</span>
                    <span><FontAwesomeIcon icon={faBolt} /> {article.engagement.shares}</span>
                  </>
                )}
                <button className="px-4 py-2 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-md transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </article>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black cyberpunk-grid">
      <header className="bg-black/90 border-b border-cyan-500 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold neon-text text-center glitch-effect" data-text="CYBER NEWS NETWORK">
            CYBER NEWS NETWORK
          </h1>
          <div className="flex justify-center gap-6 mt-4 text-cyan-400">
            <span><FontAwesomeIcon icon={faGlobe} /> LIVE</span>
            <span><FontAwesomeIcon icon={faClock} /> {format(new Date(), 'HH:mm:ss')}</span>
          </div>
          <nav className="mt-6 flex justify-center space-x-4">
            {['featured', 'live', 'community', 'interactive'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab 
                    ? 'bg-cyan-500 text-black' 
                    : 'text-cyan-500 hover:bg-cyan-500/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-400">Latest Updates</h2>
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="px-4 py-2 bg-cyber-pink text-white rounded-md hover:bg-cyber-pink/80 transition-colors"
          >
            Submit Article
          </button>
        </div>

        {showSubmitForm && (
          <div className="mb-8 news-card p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Submit Your Article</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-cyan-400 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-cyan-500 rounded-md p-2 text-white"
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <label className="block text-cyan-400 mb-2">Content</label>
                <textarea
                  className="w-full bg-black/50 border border-cyan-500 rounded-md p-2 text-white h-32"
                  placeholder="Write your article content..."
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition-colors"
              >
                Submit for Review
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-cyan-500 text-xl">Loading neural interface...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => renderArticleCard(article))}
          </div>
        )}
      </main>

      <footer className="bg-black/90 border-t border-cyan-500 mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-cyan-400">
          <p>© {new Date().getFullYear()} CYBER NEWS NETWORK • NEURAL LINK ESTABLISHED</p>
        </div>
      </footer>
    </div>
  );
}

export default App;