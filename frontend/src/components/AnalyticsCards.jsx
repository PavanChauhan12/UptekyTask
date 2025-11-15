import { MessageSquare, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';

const AnalyticsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalFeedbacks || 0,
      icon: MessageSquare,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating || 0,
      suffix: '/ 5',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Positive Ratings',
      value: stats.positiveRatings || 0,
      subtitle: 'Rating ≥ 4',
      icon: ThumbsUp,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Negative Ratings',
      value: stats.negativeRatings || 0,
      subtitle: 'Rating < 3',
      icon: ThumbsDown,
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-50 to-orange-50'
    }
  ];

  return (
    <div className="analytics-container">
      <h2 className="section-title">Dashboard Analytics</h2>
      <div className="analytics-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`analytics-card bg-gradient-${card.bgGradient}`}>
              <div className="card-content">
                <div className="card-header">
                  <h3>{card.title}</h3>
                  <div className={`icon-wrapper bg-gradient-${card.gradient}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="card-value">
                  <span className="value">{card.value}</span>
                  {card.suffix && <span className="suffix">{card.suffix}</span>}
                </div>
                {card.subtitle && (
                  <p className="card-subtitle">{card.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsCards;