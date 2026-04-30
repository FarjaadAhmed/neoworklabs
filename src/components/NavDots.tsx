"use client";

export default function NavDots({
    items,
    activeIndex,
    onSelect,
}: {
    items: any[];
    activeIndex: number;
    onSelect: (i: number) => void;
}) {
    return (
        <>
            {items.map((service, index) => (
                <button
                    key={service.id ?? index}
                    type="button"
                    aria-label={`Go to service ${index + 1}`}
                    aria-pressed={activeIndex === index}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(index);
                    }}
                    className={
                        activeIndex === index
                            ? "h-2 w-6 rounded-full bg-[#61c246] transition-all"
                            : "h-2 w-2 rounded-full bg-slate-300 hover:bg-slate-500 transition-all"
                    }
                />
            ))}
        </>
    );
}
