function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
      <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
      <div className="flex space-x-2">{children}</div>
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <div
      className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full text-sm`}
    >
      {children}
    </div>
  );
}

createRoot(root).render(
  <div className="bg-gray-100 min-h-screen flex items-center justify-center space-x-3">
    <Card title="カード 1">
      <Tag color="blue">React</Tag>
    </Card>
    <Card title="カード 2">
      <Tag color="green">JSX</Tag>
    </Card>
  </div>
);
