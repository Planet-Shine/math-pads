

class KeyAssigner {
    assign(from, to, keys) {
        this.assignTo(to, keys, this.extractFrom(from, keys));
    }
    assignTo(target, keys = [], value) {
        var result = target || getCurrentEmptyResult(keys[0]),
            length = keys.length;

        function getCurrentEmptyResult(nextKey) {
            if (typeof nextKey === 'number' && isFinite(nextKey)) {
                return [];
            }
            return {};
        }

        keys.forEach((key, index) => {
            if (index !== length - 1) {
                if (!result[key]) {
                    let nextKey = keys[index + 1];
                    result[key] = getCurrentEmptyResult(nextKey);
                }
                result = result[key];
            } else {
                result[key] = value;
            }
        });
    }
    extractFrom(target = {}, keys) {
        var result = target,
            length = keys.length;
        keys.forEach((key, index) => {
            if (index !== length - 1) {
                result = result[key] || {};
            } else {
                result = result[key];
            }
        });
        return result;
    }
};

export default new KeyAssigner();