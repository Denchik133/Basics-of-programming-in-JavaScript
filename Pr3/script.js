function parseArray(input) {
  if (!input.trim()) {
    throw new Error("Please enter numbers separated by commas");
  }
  const array = input.split(",").map(x => Number(x.trim()));
  if (array.some(x => Number.isNaN(x))) {
    throw new Error("Invalid number in input");
  }
  return array;
}

// MERGE SORT

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function runMerge() {
  try {
    const array = parseArray(mergeInput.value);
    mergeResult.textContent = mergeSort(array).join(", ");
  }
  catch (e) {
    mergeResult.textContent = e.message;
  }
}

// QUICK SELECT

function quickSelect(array, k) {
  if (k < 1 || k > array.length) {
    throw new Error("Invalid k");
  }
  return select(array, 0, array.length - 1, k - 1);
}

function select(array, left, right, k) {
  if (left === right) {
    return array[left];
  }
  const pivotIndex = partition(array, left, right);
  if (k === pivotIndex) {
    return array[k];
  }
  if (k < pivotIndex) {
    return select(array, left, pivotIndex - 1, k);
  }
  return select(array, pivotIndex + 1, right, k);
}

function partition(array, left, right) {
  const pivot = array[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }
  [array[i], array[right]] = [array[right], array[i]];
  return i;
}

function runQuick() {
  try {
    const array = parseArray(quickInput.value);
    const k = parseInt(quickK.value);
    if (Number.isNaN(k)) {
        throw new Error("k must be a number");
    }
    quickResult.textContent = quickSelect(array, k);
  }
  catch (e) {
    quickResult.textContent = e.message;
  }
}

// SEARCH ROTATED ARRAY

function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

function runRotated() {
  try {
    const array = parseArray(rotatedInput.value);
    const target = parseInt(targetInput.value);
    if (Number.isNaN(target)) {
        throw new Error("Target must be a number");
    }
    rotatedResult.textContent = searchRotated(array, target);
  }
  catch (e) {
    rotatedResult.textContent = e.message;
  }
}

// FIRST AND LAST POSITION

function searchRange(nums, target) {
  return [findFirst(nums, target), findLast(nums, target)];
}

function findFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let res = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    if (nums[mid] === target) {
      res = mid;
    }
  }
  return res;
}

function findLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let res = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    if (nums[mid] === target) {
      res = mid;
    }
  }
  return res;
}

function runRange() {
  try {
    const array = parseArray(rangeInput.value);
    const target = parseInt(rangeTarget.value);
    if (Number.isNaN(target)) {
        throw new Error("Target must be a number");
    }
    rangeResult.textContent = searchRange(array, target);
  }
  catch (e) {
    rangeResult.textContent = e.message;
  }
}

// INSERTION SORT LIST

function arrayToList(array) {
  let head = null;
  for (let i = array.length - 1; i >= 0; i--) {
    head = {
      val: array[i],
      next: head
    };
  }
  return head;
}

function listToArray(head) {
  const array = [];
  while (head) {
    array.push(head.val);
    head = head.next;
  }
  return array;
}

function insertionSortList(head) {
  const dummy = {val: 0, next: null};
  let current = head;
  while (current) {
    let prev = dummy;
    let next = current.next;
    while (prev.next && prev.next.val < current.val) {
      prev = prev.next;
    }
    current.next = prev.next;
    prev.next = current;
    current = next;
  }
  return dummy.next;
}

function runList() {
  try {
    const array = parseArray(listInput.value);
    const list = arrayToList(array);
    const sorted = insertionSortList(list);
    listResult.textContent = listToArray(sorted).join(", ");
  }
  catch (e) {
    listResult.textContent = e.message;
  }
}