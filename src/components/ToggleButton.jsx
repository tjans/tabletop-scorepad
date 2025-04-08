function toggleButton({ className, label, value, onChange, checked }) {
  let classes = "block";
  if (className) classes += " " + className;
  return (
    <>
      <div className={classes}>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={value}
            className="sr-only peer"
            onChange={onChange}
            checked={checked}
          />

          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="text-sm font-medium text-gray-900 ms-3">{label}</span>
        </label>
      </div>
    </>
  );
}

export default toggleButton;
