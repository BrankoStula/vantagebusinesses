import ButtonPrimary from "./ButtonPrimary";

export default function CtaSection() {
  return (
    <div className="cta" id="contact">
      <div className="cta-content">
        <div className="scramble v1">Get A Personalized Demo</div>
        <div className="medium-big-text text-center">
          Ready to see the Quantara<br />AI in action?
        </div>
        <ButtonPrimary href="#" label="Talk To Us" />
      </div>
    </div>
  );
}
