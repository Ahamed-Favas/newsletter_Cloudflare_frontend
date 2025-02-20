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
                    pressed={selectedList[option]}
                    onPressedChange={() => handleToggle(option)}
                    className={`rounded-3xl p-6 transition-all
                        data-[state=on]:bg-[#c0c0c045] data-[state=on]:text-white data-[state=on]:border-white/0 data-[state=on]:border-2
                        data-[state=off]:border-2 data-[state=off]:border-white/5 data-[state=off]:text-white/70
                    `}

                >
                    <span className="text-xs md:text-sm">{option}</span>
                    
                </Toggle>
            ))}
        </>
    );
}