import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { IOptions } from "../../types";



interface CustomSelectProps {
  options: IOptions[];
  onChange: (option: IOptions | null) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IOptions | null>(null);
    const [filterText, setFilterText] = useState<string>("");
    const selectRef = useRef<HTMLDivElement>(null);
  
    const handleOptionClick = (option: IOptions) => {
      setSelectedOption(option);
      onChange(option);
      setIsOpen(false);
    };
  
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);
  
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(filterText.toLowerCase())
    );
  
    return (
      <div className="relative w-56">
        <div className="border rounded p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </div>
        {isOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded-b">
            <input
              type="text"
              className="w-full p-2 border-b border-l border-r rounded-t"
              placeholder="Search..."
              value={filterText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
            />
            <ul className="py-2">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

export default CustomSelect;
