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
            className="peer sr-only"
            onChange={onChange}
            checked={checked}
          />

          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">{label}</span>
        </label>
        {/* <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value={props.value}
            className="peer sr-only"
            onChange={props.onChange}
            checked={props.checked}
          />
          <div
            className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute 
          after:start-[2px] after:top-[2px] after:h-5 after:w-5 
          after:rounded-full after:border after:border-gray-300 
          after:bg-white after:transition-all after:content-[''] 
          peer-checked:bg-blue-600 peer-checked:after:translate-x-full 
          peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700
           dark:peer-focus:ring-blue-800"
          ></div>
          <span className="ms-3 text-sm font-medium">{props.label}</span>
        </label> */}
      </div>
    </>
  );
}

export default toggleButton;
