// src/components/StarField.jsx
export default function StarField() {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: (Math.random() * 3 + 2).toFixed(1) + "s",
    op: (Math.random() * 0.55 + 0.08).toFixed(2),
  }));
  return (
    <div className="stars">
      {stars.map((s) => (
        <div key={s.id} className="star" style={{ left:s.x+"%", top:s.y+"%", width:s.size+"px", height:s.size+"px", "--dur":s.dur, "--op":s.op }} />
      ))}
    </div>
  );
}
