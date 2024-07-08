import { Controller } from "react-hook-form";

export default function AbsenceNotesInput({ control }: { control: any }) {
  return (
    <Controller
      name="absenceNotes"
      rules={{ required: true }}
      control={control}
      render={({ field }) => {
        return (
          <textarea
            name={field.name}
            placeholder="اضف تعليق"
            style={{
              resize: "none",
              width: "100%",
              height: "100%",
              paddingInline: "30px",
              border: "none",
              outline: "none",
              fontWeight: "400",
              lineHeight: "30px",
              color: "#000",
              fontSize: "16px",
            }}
            onChange={(e) => field.onChange(e.target.value)}
          ></textarea>
        );
      }}
    />
  );
}
