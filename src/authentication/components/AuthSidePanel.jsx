import { Bike, Leaf, Route, Tractor } from "lucide-react";

const AuthSidePanel = ({ ariaLabel, eyebrow, title, description, steps }) => (
  <section
    className="flex flex-col justify-center gap-4 bg-[linear-gradient(160deg,rgba(29,88,52,0.92),rgba(36,116,70,0.78))] p-6 text-white max-[900px]:p-5"
    aria-label={ariaLabel}
  >
    <div className="inline-flex w-fit items-center gap-2 text-base font-extrabold">
      <span className="grid h-8 w-8 place-items-center bg-[#f4c04f] text-[#1c5f38] shadow-[0_12px_26px_rgba(20,45,30,0.18)]">
        <Leaf size={18} />
      </span>
      <span>FarmEase</span>
    </div>

    <div className="max-w-2xl">
      <p className="mb-2 w-fit border border-white/25 bg-white/15 px-2.5 py-1.5 text-[11px] font-bold uppercase">
        {eyebrow}
      </p>
      <h1 className="m-0 max-w-xl text-2xl font-semibold leading-[1.12]">
        {title}
      </h1>
      <p className="mt-2 max-w-lg text-xs leading-5 text-white/80">
        {description}
      </p>
    </div>

    <div
      className="grid w-full max-w-sm grid-cols-[76px_1fr_76px] items-center gap-2 border border-white/20 bg-[#0b2c1a]/35 p-2 backdrop-blur max-[520px]:grid-cols-1"
      aria-hidden="true"
    >
      <div className="grid min-h-16 place-items-center gap-1 rounded-md bg-[#fffaf0] text-center text-sm font-extrabold text-[#214b31]">
        <Tractor size={19} />
        <span>Farmer</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[#f4c04f] max-[520px]:min-h-9 max-[520px]:rotate-90">
        <span className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(244,192,79,0.95)_0_12px,transparent_12px_19px)]" />
        <Route size={18} />
        <span className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(244,192,79,0.95)_0_12px,transparent_12px_19px)]" />
      </div>
      <div className="grid min-h-16 place-items-center gap-1 rounded-md bg-[#dff3ff] text-center text-sm font-extrabold text-[#165c75]">
        <Bike size={19} />
        <span>Delivery</span>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
      {steps.map((step) => {
        const StepIcon = step.icon;

        return (
          <article
            className="flex gap-2 rounded-md border border-white/20 bg-white/15 p-2"
            key={step.title}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center bg-[#f4c04f]/20 text-[#ffd56f]">
              <StepIcon size={15} />
            </span>
            <div>
              <h3 className="m-0 mb-1 text-xs font-bold leading-snug">
                {step.title}
              </h3>
              <p className="m-0 text-[11px] leading-4 text-white/75">
                {step.text}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default AuthSidePanel;
