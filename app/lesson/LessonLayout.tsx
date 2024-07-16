type Props = {
  children: React.ReactNode;
};

export default function LessonLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
}
