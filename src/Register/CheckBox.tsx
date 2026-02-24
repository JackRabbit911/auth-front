import { __ } from "common/i18n/utils";
import { useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
}

const CheckBox = ({ fieldName }: Props) => {
  const { register, getValues } = useFormContext()
  const checked = Boolean(getValues(fieldName))

  return (
    <fieldset className="fieldset mt-4">
      <label className="fieldset-label flex justify-between">
        <legend className="fieldset-legend me-0.5 pb-1 pt-0">
          <span>
            {__("I agree with the") + ' '} 
            <a href="" className="link">
              {__('site rules')}
            </a> {__('and') + ' '} 
            <a href="" className="link">
              {__('privacy policy')}
            </a>
          </span>
        </legend>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          defaultChecked={checked}
          {...register(fieldName)}
        />
      </label>
    </fieldset>
  )
}

export default CheckBox
