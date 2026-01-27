import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 p-4 bg-neutral-700/60 flex items-center justify-center">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">Add More Fields</h1>
          <button className="w-fit block ml-auto" onClick={close}>
            <IoClose size={20} className="cursor-pointer" />
          </button>
        </div>
        <div className="grid gap-2 my-2">
          <input
            type="text"
            className="bg-blue-50 p-2 border-2 rounded outline-none focus:border-amber-500"
            value={value}
            onChange={onChange}
            placeholder="Enter field name"
          />
        </div>
        <button
          onClick={submit}
          className="bg-yellow-500 px-4 py-2 rounded text-white mx-auto w-fit block mt-4 hover:bg-yellow-600 transition cursor-pointer"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
