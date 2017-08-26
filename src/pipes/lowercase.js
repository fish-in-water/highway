
/**
 * lowercase管道
 */
const lowercase = () => {
  return {
    $iterator($value) {
      if ($value == null) {
        return $value;
      }

      return ($value + '').toLowerCase();
    }
  }
};

export default lowercase;
