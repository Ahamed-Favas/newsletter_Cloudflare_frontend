import { Toggle } from "@/components/ui/toggle";
import { Dispatch, SetStateAction } from "react";

interface ToggleItemProps {
    toggleList: string[];
    selectedList: { [key: string]: boolean };
    setFunction: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    maxLen: number
}

export function ToggleItem({ toggleList, selectedList, setFunction, maxLen }: ToggleItemProps) {
    const handleToggle = (option: string) => {
        setFunction((prev) => {
            const selectedValuesCount = Object.values(prev).filter(Boolean).length;
            if (!prev[option] && selectedValuesCount >= maxLen) {
                return prev;
            }
            return {
                ...prev,
                [option]: !prev[option],
            };
        });
    };

    return (
        <>
            {toggleList.map((option: string) => (
                <Toggle
                    key={option}
                    aria-label={`Toggle ${option}`}
                    pressed={selectedList[option] || toggleList.length === 1} //  if only one element is toggle list it defaultly in pressed
                    onPressedChange={() => handleToggle(option)}
                    className={`rounded-3xl p-6 transition-all
                    data-[state=on]:bg-stone-600 data-[state=on]:text-white
                    data-[state=off]:bg-white/5 data-[state=off]:text-white/70
                    data-[state=off]:backdrop-blur-sm`}

                >
                    <span className="text-xs md:text-sm">{option}</span>
                    
                </Toggle>
            ))}
        </>
    );
}