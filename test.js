const allPath = []

function getMaxDepth(tree) {
    if(!tree) return 0;
    recursionToDeepestNode(tree);
    allPath.sort((arrA, arrB) => arrA.length - arrB.length);
    console.log(allPath?.[0]?.length || 0)
}

function recursionToDeepestNode(tree, path=[]) {
    console.log(tree);
    
    if(tree.val) {
        path.push(tree.val);
    }

    if(tree.leftSubNode) {
        recursionToDeepestNode(tree.leftSubNode, [...path])
    } 
    if(tree.rightSubNode) {
        recursionToDeepestNode(tree.rightSubNode, [...path])
    }

    if(!tree.leftSubNode && !tree.rightSubNode) {
        allPath.push(path);
    }
}

getMaxDeep({
    val: 1,
    leftSubNode: {
        val: 2,
        leftSubNode: {
            val: 3,
            rightSubNode: {
                val: 4
            }
        }
    },
    rightSubNode: {
        val: 5
    }
})

console.log(allPath);
