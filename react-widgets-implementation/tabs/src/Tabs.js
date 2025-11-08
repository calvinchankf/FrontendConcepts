export default function Tabs({
  titles,
  tabIdx,
  onTabChange
}) {
  return (
    <div>
      {
        titles.map((t, i) => (
          <button
            style={i === tabIdx ? { backgroundColor: 'red' } : {backgroundColor: 'transparent' }}
            onClick={() => onTabChange(i)}
          >{t}</button>
        ))
      }
    </div>
  );
}
