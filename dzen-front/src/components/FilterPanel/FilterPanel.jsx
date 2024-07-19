import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { FilterPanelWrapper } from "./FilterPanel.styled";

const fields = [
  { title: "User name", name: "username" },
  { title: "E-mail", name: "email" },
  { title: "Created at", name: "createdAt" },
];

export const FilterPanel = ({
  field = "createdAt",
  direction = "DESC",
  onChange,
}) => {
  const setSort = (fieldName) => {
    let directionValue;
    if (fieldName === field) {
      directionValue = direction === "ASC" ? "DESC" : "ASC";
    } else {
      directionValue = direction === "createdAt" ? "DESC" : "ASC";
    }
    onChange({ field: fieldName, direction: directionValue });
  };

  return (
    <FilterPanelWrapper>
      {fields.map((elem) => (
        <button
          key={elem.name}
          type="button"
          onClick={() => setSort(elem.name)}
        >
          <span>
            {elem.title}
            {"  "}
          </span>
          {elem.name === field &&
            (direction === "DESC" ? (
              <CaretDownOutlined />
            ) : (
              <CaretUpOutlined />
            ))}
        </button>
      ))}
    </FilterPanelWrapper>
  );
};
