// client/src/components/Story.jsx

const timeline = [
  {
    side: 'left',
    node: '💚',
    title: 'How We Met',
    text: 'A simple crossover path that quickly blossomed into deep, inspiring alignment. Conversations turned into a lifelong connection neither of us saw coming.',
  },
  {
    side: 'right',
    node: '💙',
    title: 'The First Date',
    text: 'Shared laughter, incredible food, and the distinct realization that this connection was something beautifully out of the ordinary — a feeling that never left.',
  },
  {
    side: 'left',
    node: '✨',
    title: 'The Proposal',
    text: 'Surrounded by love and clarity, a heartfelt question — and a joyful "Yes" — paved the way to this beautiful celebration we now count the days toward.',
  },
];

export default function Story() {
  return (
    <section className="story-section" id="story">
      <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>
        Our Journey
      </p>
      <h2 className="section-title" style={{ textAlign: 'center' }}>
        How It All <em>Began</em>
      </h2>
      <div className="timeline">
        <div className="timeline-spine" />
        {timeline.map((item) => (
          <div className={`timeline-item ${item.side}`} key={item.title}>
            <div className="timeline-node">{item.node}</div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
