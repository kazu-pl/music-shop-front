import { GuitarFilterTypeEnum } from "__generated__/graphql";

const filtersMap: { value: GuitarFilterTypeEnum; label: string }[] = [
  {
    label: "Dostępność",
    value: GuitarFilterTypeEnum.Availability,
  },
  {
    label: "Drewno",
    value: GuitarFilterTypeEnum.BodyWood,
  },
  {
    label: "Mostek",
    value: GuitarFilterTypeEnum.Bridge,
  },
  {
    label: "Podstrunnica",
    value: GuitarFilterTypeEnum.FingerboardWood,
  },
  {
    label: "typ",
    value: GuitarFilterTypeEnum.GuitarType,
  },
  {
    label: "Przystawki",
    value: GuitarFilterTypeEnum.PickupsSet,
  },
  {
    label: "Producent",
    value: GuitarFilterTypeEnum.Producer,
  },
  {
    label: "Kształt",
    value: GuitarFilterTypeEnum.Shape,
  },
];

export default filtersMap;
