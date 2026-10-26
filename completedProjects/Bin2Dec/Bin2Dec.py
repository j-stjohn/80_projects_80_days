def bin2DecConverter(value):
    # To convert a binary number to decimal
    # Sum each digit multiplied by 2^n
    counter = 0
    sum = 0
    while counter < len(value):
        sum += int(value[counter]) * 2**(len(value)-counter)
        counter += 1
    return sum


def main():
    value = str(input("Enter your binary value: "))
    print(bin2DecConverter(value))


main()