/**
 * uppercase管道
 */
const uppercase = () => {
  return {
    $iterator($value) {
      if ($value == null) {
        return $value;
      }

      return ($value + '').toUpperCase();
    }
  }
};

export default uppercase;
