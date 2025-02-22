import FuzzyText from "@/Animation/FuzzyText";

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <FuzzyText baseIntensity={0.2} hoverIntensity={1.88} enableHover={true}>
        404 Not Found
      </FuzzyText>
    </div>
  );
}