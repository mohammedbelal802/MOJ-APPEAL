import { Box, Typography } from "@mui/material";
import { usersConfig } from "../../utils/config";
import { Controller } from "react-hook-form";
interface PERSON {
  id: number;
  job: string;
  name: string;
  status: string;
}
export default function UsersSelection({
  control,
  users,
}: {
  control: any;
  users: Array<PERSON>;
}) {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "400",
          color: "#363841",
          mb: "8px",
        }}
      >
        الأطراف
      </Typography>

      <Controller
        name="user"
        rules={{ required: true }}
        control={control}
        render={({ field }) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "18px 15px",
                boxShadow: "0px 4px 19px 0px #4548520A",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              <Box
                className="style_scroll_bar"
                sx={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  overflowX: "scroll",
                  pb: "4px",
                }}
              >
                {users.map((item: PERSON, index: number) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        cursor: "pointer",
                        flexShrink: 0,
                        padding: "8px 20px",
                        backgroundColor:
                          field?.value?.id === item.id ? "#077C5A" : "#F5F8FA",
                        color:
                          field?.value?.id === item.id ? "#fff" : "#617696",
                        fontSize: "12px",
                        fontWeight: "400",
                        borderRadius: "8px",
                      }}
                      onClick={() => field.onChange(item)}
                    >
                      {item.name}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        }}
      />
    </div>
  );
}
